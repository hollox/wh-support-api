export interface UserInformation {
  userId: string;
  email: string;
  emailVerified: boolean;
}

export interface UserInformationResponse {
  sub: string;
  email: string;
  email_verified: boolean;
}
