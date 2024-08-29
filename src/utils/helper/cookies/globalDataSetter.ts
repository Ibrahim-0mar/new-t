import { storeDataInCookies } from './server';

const globalDataSetter = async (fieldNmae: string, data: any) => {
  await storeDataInCookies(fieldNmae, data);

  if (window !== undefined) window.localStorage.setItem(fieldNmae, JSON.stringify(data));
};

export default globalDataSetter;
