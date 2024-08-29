'use server';

import { authOptions } from '@/app/api/auth/authOptions';
import api from '@/services/apis/api';
import { defaultLanguage } from '@/services/data/common';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import { ServerUserData } from '@/utils/helper/userData';
import { getServerSession } from 'next-auth';

const { code: lang } = globalDataGetter('server', 'language') || defaultLanguage;

export const updateUserNameAPI = async ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const session = await getServerSession(authOptions);
  const { token, displayName } = ServerUserData(session);

  try {
    const { data } = await api.put(
      `/user/profile`,
      { firstName: firstName.trim(), lastName: lastName.trim(), displayName: displayName || '' },
      {
        headers: {
          'Accept-Language': lang,
          authorization: `Bearer ${token}`,
        },
      },
    );

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const updateDisplayNameAPI = async (displayName: string) => {
  const session = await getServerSession(authOptions);
  const { token } = ServerUserData(session);

  try {
    const { data } = await api.put(
      `/user/profile`,
      { displayName: displayName.trim() },
      {
        headers: {
          'Accept-Language': lang,
          authorization: `Bearer ${token}`,
        },
      },
    );

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const updateEmailAPI = async ({ email }: { email: string }) => {
  const session = await getServerSession(authOptions);
  const { token } = ServerUserData(session);

  try {
    const { data } = await api.put(
      `/user/email`,
      { email },
      {
        headers: {
          'Accept-Language': lang,
          authorization: `Bearer ${token}`,
        },
      },
    );

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const verifyEmailAPI = async ({
  email,
  confirmCode,
}: {
  email: string;
  confirmCode: string;
}) => {
  const session = await getServerSession(authOptions);
  const { token } = ServerUserData(session);

  try {
    const { data } = await api.post(
      `/auth/confirm-code`,
      { email, confirmCode },
      {
        headers: {
          'Accept-Language': lang,
          authorization: `Bearer ${token}`,
        },
      },
    );

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err.response.data.status,
      message: err.response.data.message,
    };
  }
};

export const updatePassAPI = async ({
  newPassword,
  confirmPassword,
  recover_password,
}: {
  newPassword: string;
  confirmPassword: string;
  recover_password?: string | null;
}) => {
  const session = await getServerSession(authOptions);
  const token = session ? ServerUserData(session).token : recover_password;

  try {
    const { data } = await api.put(
      `/user/password`,
      { newPassword, confirmPassword },
      {
        headers: {
          'Accept-Language': lang,
          authorization: `Bearer ${token}`,
        },
      },
    );
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err.response.data.status,
      message: err.response.data.message,
    };
  }
};
