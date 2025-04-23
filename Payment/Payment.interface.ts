import { Types } from 'mongoose';

export interface TPayment {
  booking: Types.ObjectId;
  amount: number;
  method: 'sslcommerz';
  type: 'half' | 'remaining' | 'full';
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  history: Array<{
    status: 'pending' | 'completed' | 'failed';
    at: Date;
    note?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface T_SSLValidationResponse {
  status: string;
  amount: string;
}

// for callbacks from SSLCommerz
export interface TCallBack {
  tran_id: string;
  val_id: string;
  status: string;
  amount: string;
  currency?: string;
}
