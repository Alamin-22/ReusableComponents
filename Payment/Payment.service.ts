/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import axios from 'axios';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { BookingModel } from '../Bookings/Bookings.model';
import config from '../../config';
import { PaymentModel } from './Payment.model';
import { PaymentValidations } from './Payment.validation';
import { T_SSLValidationResponse } from './Payment.interface';

const SSL_INIT_URL = config.sslCommerzEnv.sslInitUrl as string;
const SSL_VALIDATION_URL = config.sslCommerzEnv.sslValidationUrl as string;

const initiatePayment = async (
  bookingId: string,
  type: 'half' | 'remaining' | 'full',
): Promise<string> => {
  // Fetch booking with customer details
  const booking = await BookingModel.findById(bookingId)
    .populate({
      path: 'user',
      select:
        '-authProvider -__v -isDeleted -lastLogin -updatedAt -createdAt -status',
      populate: {
        path: 'customerDetails',
        select:
          'name email contactNumber addressLine1 city state postcode country',
      },
    })
    .populate('vehicle');

  if (!booking) throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');

  // Calculate existing payments & determine amount
  const payments = await PaymentModel.find({ booking: booking._id });
  const completedPayments = payments.filter((p) => p.status === 'completed');
  const pendingPayments = payments.filter((p) => p.status === 'pending');

  const alreadyPaid = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPrice = booking.price;
  let amount: number;

  switch (type) {
    case 'half':
      if (alreadyPaid > 0 || pendingPayments.some((p) => p.type === 'half')) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Half-payment already done or pending',
        );
      }
      amount = totalPrice / 2;
      break;

    case 'remaining': {
      const remaining = totalPrice - alreadyPaid - pendingAmount;
      if (remaining <= 0) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Nothing remains to be paid',
        );
      }
      amount = remaining;
      break;
    }

    case 'full':
      if (alreadyPaid > 0 || pendingPayments.length > 0) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Cannot request full after partial or pending payments exist',
        );
      }
      amount = totalPrice;
      break;

    default:
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid payment type');
  }

  // Create pending Payment
  const payment = await PaymentModel.create({
    booking: booking._id,
    amount,
    type,
    method: 'sslcommerz',
    status: 'pending',
    history: [{ status: 'pending', note: 'initiated' }],
  });

  // Build SSLCommerz payload
  const userInfo = (booking.user as any)?.customerDetails;

  const payload = {
    store_id: config.sslCommerzEnv.storeId,
    store_passwd: config.sslCommerzEnv.storePassword,
    total_amount: String(amount),
    currency: 'BDT',
    tran_id: payment._id.toString(),

    success_url: `${config.sslCommerzEnv.baseURL}/payments/success`,
    fail_url: `${config.sslCommerzEnv.baseURL}/payments/fail`,
    cancel_url: `${config.sslCommerzEnv.baseURL}/payments/cancel`,
    ipn_url: `${config.sslCommerzEnv.baseURL}/payments/ipn`,

    product_name: `Booking#${booking._id}`,
    product_category: 'General',
    product_profile: 'general',

    cus_name: userInfo.name,
    cus_email: userInfo.email,
    cus_add1: userInfo.addressLine1 || 'N/A',
    cus_city: userInfo.city || 'N/A',
    cus_state: userInfo.state || 'N/A',
    cus_postcode: userInfo.postcode || '0000',
    cus_country: userInfo.country || 'Bangladesh',
    cus_phone: userInfo.contactNumber,

    shipping_method: 'NO',
    num_of_item: '1',

    value_a: booking._id.toString(),
  };

  // Form-encode & send
  const formBody = new URLSearchParams(
    Object.entries(payload).map(([k, v]) => [k, String(v)]),
  ).toString();

  try {
    const { data } = (await axios.post(SSL_INIT_URL, formBody, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })) as { data: { GatewayPageURL?: string } };

    if (!data.GatewayPageURL) {
      console.error('SSL Init failed:', data);
      throw new AppError(httpStatus.BAD_GATEWAY, 'Failed to init payment');
    }

    return data.GatewayPageURL;
  } catch (err: any) {
    console.error('SSLCommerz init error:', err.response?.data || err.message);
    throw new AppError(
      httpStatus.BAD_GATEWAY,
      `SSL init failed: ${err.response?.data?.failedreason || err.message}`,
    );
  }
};

const verifyWithSSL = async (val_id: string, expected: number) => {
  const { data } = await axios.get<T_SSLValidationResponse>(
    SSL_VALIDATION_URL,
    {
      params: {
        val_id,
        store_id: config.sslCommerzEnv.storeId,
        store_passwd: config.sslCommerzEnv.storePassword,
        v: 1,
        format: 'json',
      },
    },
  );

  if (data.status !== 'VALID') {
    throw new AppError(httpStatus.BAD_REQUEST, 'SSLCommerz validation failed');
  }

  const paid = parseFloat(data.amount);
  if (paid !== expected) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Amount mismatch: expected ${expected}, got ${paid}`,
    );
  }

  return data;
};

const handleCallback = async (rawBody: any) => {
  // Validate the incoming webhook payload
  const body = PaymentValidations.CallbackValidationSchema.parse(rawBody);
  const { tran_id, val_id } = body;

  //  Load the pending Payment record
  const payment = await PaymentModel.findById(tran_id);
  if (!payment) throw new AppError(httpStatus.NOT_FOUND, 'Payment not found');
  // already verified
  if (payment.status !== 'pending') return payment;

  // Verify with SSLCommerz
  await verifyWithSSL(val_id, payment.amount);

  // Atomically update payment + booking
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      // Mark this payment completed
      payment.transactionId = val_id;
      payment.status = 'completed';
      payment.history.push({
        status: 'completed',
        at: new Date(),
        note: 'Verified via SSLCommerz',
      });
      await payment.save({ session });

      // re calculate totals and update the booking
      const booking = await BookingModel.findById(payment.booking).session(
        session,
      );
      if (!booking) {
        throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
      }

      // Sum all completed payments for this booking
      const agg = await PaymentModel.aggregate([
        { $match: { booking: booking._id, status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]).session(session);

      const totalPaid = agg[0]?.total || 0;
      booking.paidAmount = totalPaid;
      booking.dueAmount = booking.price - totalPaid;

      // If any payment has come in, confirm the booking
      if (booking.status === 'pending' && totalPaid > 0) {
        booking.status = 'confirmed';
        //  we are going send email from here
      }

      await booking.save({ session });
    });
  } catch (err: any) {
    console.error('Transaction error:', err);
    await session.abortTransaction();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  } finally {
    session.endSession();
  }

  return payment;
};

export const PaymentService = {
  initiatePayment,
  handleCallback,
};
