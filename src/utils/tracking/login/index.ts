import { AuthMethod } from '../../../../next-auth';

export const loginCompleteTracking = (method: AuthMethod, email: string) => {
  try {
    window.dataLayer.push({
      event: 'login',
      data: {
        method,
        userId: email
      },
    });
  } catch (err) {}
};
