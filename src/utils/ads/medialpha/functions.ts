import globalDataSetter from '@/utils/helper/cookies/globalDataSetter';
import { v4 as uuid } from 'uuid';

export const generateNewVisitorId = () => {
  const visitorId = uuid();
  globalDataSetter('visitorId', visitorId);

  return visitorId;
};
