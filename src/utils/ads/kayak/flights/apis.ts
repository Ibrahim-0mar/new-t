import api from '@/services/apis/api';

export const fetchKayakInlineAds = async (searchPayload: any) => {
  try {
    const { data } = await api.post('/kayak/inline/flights', {
      ...searchPayload,
    });
    return data?.inlineItems;
  } catch (err) {
    return [];
  }
};
