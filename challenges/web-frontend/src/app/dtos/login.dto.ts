interface LoginDTO {
  authenticated: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  token: string;
  type: number;
  privileges: string;
  userRole: string;
  authenticationChallenge: string;
}
