// export type MembershipType = "basic" | "premium" | "ultimate";

export interface MyPageUserInfoResponse {
  userNo: number;
  username: string;
  companyName: string;
  membershipName : string;
  membershipExpiredAt: string;
}
