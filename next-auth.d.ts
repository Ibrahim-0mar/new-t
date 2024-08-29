import 'next-auth';

interface LinkedAccount {
  accountId: string;
  accessToken: string;
  type: string;
  _id: string;
}

interface ImageDetails {
  _id: string;
  pathWithFilename: string;
  mime: string;
  filename: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}
declare module 'next-auth' {
  interface User {
    id?: string;
    _id?: string;
    isVerified?: boolean;
    isDeleted?: boolean;
    role?: string;
    email?: string | null;
    avatarUrl?: string;
    mainAirport?: string;
    source?: string;
    access_token?: string;
    id_token?: string;
    sub?: string;
    provider?: string;
    providerAccountId?: string;
    expires_at?: number;
    linkedAccounts?: LinkedAccount[];
    image?: ImageDetails;
    displayName?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    isNewUser?: boolean | undefined;
    apiResponse?: {
      _id: string;
      isVerified: boolean;
      isDeleted: boolean;
      isNewUser: boolean;
      role: string;
      email: string;
      password: string;
      avatarUrl: string;
      mainAirport: string;
      source: string;
      linkedAccounts: unknown;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  }

  interface Session {
    user?: User;
    accessToken?: string;
    expires?: string | number;
    error?: string;
  }

  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    image?: string;
    email_verified?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    exp: number;
    user: any;
  }
}

type AuthMethod = 'email' | 'google' | 'facebook';