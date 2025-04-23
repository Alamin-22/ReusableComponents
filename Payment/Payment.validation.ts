import { z } from 'zod';
import { PaymentType } from './Payment.constant';

const initPaymentValidationSchema = z.object({
  body: z.object({
    bookingId: z.string().length(24),
    type: z.enum(PaymentType),
  }),
});

const CallbackValidationSchema = z
  .object({
    tran_id: z.string().length(24),
    val_id:  z.string(),
    status:  z.string(),
    amount:  z.string(),
    currency: z.string().optional(),
  })
  .passthrough();   

export const PaymentValidations = {
  initPaymentValidationSchema,
  CallbackValidationSchema,
};
