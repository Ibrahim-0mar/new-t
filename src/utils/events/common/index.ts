import { signUpStartTracking } from '@/utils/tracking/signUp/signUpStart';
import { AuthMethod } from '../../../../next-auth';
import { withDataLayerClearing } from '../dataLayerClearing';
import { signUpCompleteTracking } from '@/utils/tracking/signUp/sigUpComplete';
import { loginCompleteTracking } from '@/utils/tracking/login';

export const eventsOnSugnUpStart = withDataLayerClearing((method: AuthMethod, reason: 'normal') => {
  signUpStartTracking(method, reason);
});

export const eventsOnSignUpComplete = withDataLayerClearing((method: AuthMethod, email: string) => {
  signUpCompleteTracking(method, email);
});
export const eventsOnLoginComplete = withDataLayerClearing((method: AuthMethod, email: string) => {
  loginCompleteTracking(method, email);
});
