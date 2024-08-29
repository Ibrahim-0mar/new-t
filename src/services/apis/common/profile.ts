import api from '../api';

export const updateUserAvatarAPI = async (images: FormData, token: string) => {
  try {
    const { data } = await api.post('/user/upload/avatar', images, {
      headers: {
        'content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      data: err?.response || err,
    };
  }
};
