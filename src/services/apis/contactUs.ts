import { ContactUsForm } from '@/utils/types/common/index';
import axios from 'axios';

export const ContactUsApi = async (values: ContactUsForm) => {
  const { subject, name, email, message } = values;

  await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contact-us`, {
    subject,
    fullName: name,
    from: email,
    message,
  });
};
