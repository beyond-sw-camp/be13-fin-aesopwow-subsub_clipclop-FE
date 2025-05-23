export interface CustomerInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface PaymentRequest {
  storeId: string;
  channelKey: string;
  paymentId: string;
  orderName: string;
  totalAmount: number;
  currency: string;
  payMethod: string;
  customer: CustomerInfo;
}