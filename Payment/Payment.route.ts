import { Router } from 'express';
import { PaymentValidations } from './Payment.validation';
import { paymentController } from './Payment.controller';
import ValidateRequestMiddleWare from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/init',
  ValidateRequestMiddleWare(PaymentValidations.initPaymentValidationSchema),
  paymentController.init,
);

router.get('/success', paymentController.success);

router.get('/fail', paymentController.fail);

router.get('/cancel', paymentController.cancel);

router.post(
  '/ipn',
  // ValidateRequestMiddleWare(PaymentValidations.CallbackValidationSchema),
  paymentController.callback,
);

export const paymentRoutes = router;
