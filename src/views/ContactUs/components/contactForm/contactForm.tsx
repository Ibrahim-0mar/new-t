'use client';
import Button from '@/components/common/base/Button';
import DisplayMessage from '@/components/common/base/DisplayMessage';
import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import { ContactUsApi } from '@/services/apis/contactUs';
import useMessageDisplay from '@/utils/hooks/useMessageDisplay';
import { ContactUsSchema } from '@/utils/schemas/common';
import { ContactUsForm } from '@/utils/types/common/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';

const ContactForm = () => {
  const t = useTranslations();
  const {
    handleSubmit,
    register,
    formState: { isLoading, isSubmitting, errors },
    reset,
  } = useForm<ContactUsForm>({
    resolver: yupResolver(ContactUsSchema),
  });
  const { message, setMessageDisplay } = useMessageDisplay();

  const onSubmit: SubmitHandler<ContactUsForm> = async (values) => {
    try {
      await ContactUsApi(values);

      setMessageDisplay('success', t('49ME4oA5zE-MkqE7trGmn'));
      reset();
    } catch (error: any) {
      setMessageDisplay('error', error?.message || t('5bXQAmtrW47u6v3-CTPZq'));
    }
  };
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <DisplayMessage message={message} />
      <input type="text" {...register('name')} placeholder={t('nNq4ZUBWTvmbj9w01TJGP')} />
      {errors.name?.message && (
        <p className={styles.invalidValue}>
          <ValidationFeedback messageSlug={errors.name?.message} />
        </p>
      )}
      <input type="email" {...register('email')} placeholder={t('qw1yPmp26RxkmAfAWZ1CA')} />
      {errors.email?.message && (
        <p className={styles.invalidValue}>
          <ValidationFeedback messageSlug={errors.email?.message} />
        </p>
      )}
      <input type="text" {...register('subject')} placeholder={t('4t8SU3VwDWIxRL4c1GH_H')} />
      {errors.subject?.message && (
        <p className={styles.invalidValue}>
          <ValidationFeedback messageSlug={errors.subject?.message} />
        </p>
      )}
      <textarea {...register('message')} placeholder={t('A_12EwIvwXSn5pmRB_MhI')} rows={10} />
      {errors.message?.message && (
        <p className={styles.invalidValue}>
          <ValidationFeedback messageSlug={errors.message?.message} />
        </p>
      )}
      <Button
        type="submit"
        aria-label={t('eSIksKB7UCfKb3yFmfC3N')}
        isLoading={isLoading || isSubmitting}
        className="mt-8"
      >
        {isLoading || isSubmitting ? <LoadingSpinner /> : t('51VJ6waWZhkKoZZIx9zN2')}
      </Button>
    </form>
  );
};

export default ContactForm;
