import { AuthMethod } from '../../../../../next-auth';

export const signUpStartTracking = (method: AuthMethod, reason: 'normal') => {
  try {
    window.dataLayer = window.dataLayer || [];

    window?.dataLayer?.push({
      event: 'signUpStart',
      data: {
        reason,
        method,
      },
    });
  } catch (err) {}
};