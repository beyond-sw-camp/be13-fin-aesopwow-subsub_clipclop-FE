export interface OtpVerificationRequest {
    email: string,
    otp: string,
    // success:boolean
}

export interface OtpVerificationResponse {
  status: string; // 예: 'success' | 'fail'
  message: string;
  data?: {
    userId: number;
    email: string;
  };
}