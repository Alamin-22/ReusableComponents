import { Schema, model } from 'mongoose';
import { TPayment } from './Payment.interface';
import { PaymentStatus, PaymentType } from './Payment.constant';

const paymentSchema = new Schema<TPayment>(
  {
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ['sslcommerz'], default: 'sslcommerz' },
    type: { type: String, enum: PaymentType, required: true },
    transactionId: { type: String, unique: true, sparse: true },
    status: { type: String, enum: PaymentStatus, default: 'pending' },
    history: [
      {
        status: { type: String, enum: PaymentStatus },
        at: { type: Date, default: Date.now },
        note: String,
      },
    ],
  },
  { timestamps: true },
);

paymentSchema.index({ booking: 1 });

export const PaymentModel = model<TPayment>('Payment', paymentSchema);
