export interface MyPageUserInfoResponse {
    username: string;
    companyName: string;
    membership: "basic" | "prime" | "ultimate"; // enum처럼 제한 가능
    membership_expired_at: string; // ISO 날짜 문자열
  }