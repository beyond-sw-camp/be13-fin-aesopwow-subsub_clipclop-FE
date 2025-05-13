// 요청용 DTO
export interface CheckEmailRequest {
    email: string;
  }
  
  // 응답용 DTO
  export interface CheckEmailResponse {
    email: string;
    available: boolean;
  }