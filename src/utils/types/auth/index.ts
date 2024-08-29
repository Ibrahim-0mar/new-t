export interface ConfirmEmailType {
  confirmCode: string;
}

export interface LoginFormType {
  email: string;
  password: string;
  remeberMe: boolean;
  [key: string]: string | boolean;
}

export interface RecoverPassType {
  email: string;
  [key: string]: string | boolean;
}

export interface SignUpFormType {
  email: string;
  password: string;
  confirmPassword: string;
  // phoneNumber: string;
  [key: string]: string;
}
export interface newPassFormType {
  newPassword: string;
  confirmPassword: string;
  [key: string]: string;
}

// session types

export interface SessionType {
  access_token: string;
  apiResponse: {
    avatarUrl: string;
    createdAt: string;
    firstName: string;
    email: string;
    isDeleted: boolean;
    isVerified: boolean;
    linkedAccounts: LinkedAccount[];
    mainAirport: string;
    password: string;
    role: string;
    source: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  email: string;
  exp: number;
  expires_at: number;
  iat: number;
  id_token: string;
  jti: string;
  name: string;
  picture: string;
  provider: string;
  providerAccountId: string;
  sub: string;
}

interface LinkedAccount {
  accountId: string;
  accessToken: string;
  type: string;
  _id: string;
}
