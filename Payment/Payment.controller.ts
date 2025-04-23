import sendResponse from '../../utils/sendResponse';
import { PaymentService } from './Payment.service';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { PaymentValidations } from './Payment.validation';

const init = catchAsync(async (req, res) => {
  const { bookingId, type } = req.body;

  const paymentUrl = await PaymentService.initiatePayment(bookingId, type);
  sendResponse(res, {
    statusCode: httpStatus.ACCEPTED,
    success: true,
    message: 'Payment initiated',
    data: { paymentUrl },
  });
});

const callback = catchAsync(async (req, res) => {
  // now explicitly parse here:
  const body = PaymentValidations.CallbackValidationSchema.parse(req.body);

  await PaymentService.handleCallback(body);
  res.send('OK');
});

const success = catchAsync(async (req, res) => {
  console.log(' Browser redirected to /success', req.query);
  // show a user‑friendly page or JSON:
  res.send(`Payment ${req.query.status || 'success'}. Thank you!`);
});

const fail = catchAsync(async (req, res) => {
  console.log('Browser redirected to /fail', req.query);
  res.send('Payment failed. Please try again.');
});

const cancel = catchAsync(async (req, res) => {
  console.log(' Browser redirected to /payments/cancel', req.query);
  res.send('Payment cancelled. No charge was made.');
});

export const paymentController = {
  init,
  callback,
  success,
  fail,
  cancel,
};
