import { AuthMethod } from '../../../../../next-auth';

export const signUpCompleteTracking = (method: AuthMethod, email: string) => {
  try {
    window.dataLayer = window.dataLayer || [];
    
    window?.dataLayer?.push({
      event: 'signUpComplete',
      data: {
        method,
        userId: email
      },
    });
  } catch (err) {}
};
