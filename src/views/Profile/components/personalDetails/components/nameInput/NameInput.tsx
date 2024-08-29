'use client';
import Button from '@/components/common/base/Button';
import DisplayMessage from '@/components/common/base/DisplayMessage';
import Input from '@/components/common/base/Input';
import { cn } from '@/utils/helper/tailwind_cn';
import useMessageDisplay from '@/utils/hooks/useMessageDisplay';
import { UpdateUserNameSchema } from '@/utils/schemas/AuthSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateUserNameAPI } from '../../actions/actions';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';

interface FormType {
  firstName: string;
  lastName: string;
}

const NameInput: React.FC<FormType> = ({ firstName, lastName }) => {
  const t = useTranslations();

  const { data: session, update } = useSession();
  const [showForm, setShowForm] = useState<boolean>(false);
  const { message, setMessageDisplay } = useMessageDisplay();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isLoading, isSubmitting, errors },
  } = useForm<FormType>({
    defaultValues: {
      firstName,
      lastName,
    },
    resolver: yupResolver(UpdateUserNameSchema),
  });

  const onSubmit: SubmitHandler<FormType> = async (values) => {
    try {
      const { success } = await updateUserNameAPI(values);

      if (success) {
        update({ ...session, user: { ...session?.user, ...values } });
        toggleEditName();
        setMessageDisplay('success', t('6qqTau7Ciyq8jfwpcQe54'));
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessageDisplay('error', t('Ka6QMP0GmigsVjwsMVDrj'));
      }
    } catch (err: any) {
      setMessageDisplay('error', t('5bXQAmtrW47u6v3-CTPZq'));
    }
  };

  const toggleEditName = () => setShowForm((prevState) => !prevState);
  return (
    <div className={styles.container}>
      <div className={cn('flex gap-5')}>
        <p className={styles.detailKey}>{t('j1x66ys0KsXExfjLqtRXc')}</p>
        {!showForm ? (
          <div className={styles.valueContainer}>
            <p className={cn(styles.middleSpan, true && 'font-bold capitalize')}>
              {watch('firstName')} {watch('lastName')}
            </p>
            <Button
              type="button"
              variant="default"
              className={styles.edit}
              onClick={toggleEditName}
            >
              {t('2KdQYJL6yPXa3ctkso9sN')}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className="flex w-full items-start justify-between gap-2">
              <div className="w-full">
                <Input
                  className={cn(
                    styles.input,
                    errors?.firstName && 'border-red-500 focus-visible:ring-transparent',
                  )}
                  placeholder={t('-C78qMFAfad8VW2hOYLNv')}
                  {...register('firstName')}
                />
                <DisplayMessage
                  message={{
                    type: 'error',
                    message: <ValidationFeedback messageSlug={errors?.firstName?.message} />,
                  }}
                />
              </div>
              <div className="w-full">
                <Input
                  className={cn(
                    styles.input,
                    errors?.lastName && 'border-red-500 focus-visible:ring-transparent',
                  )}
                  placeholder={t('VBbWgEVJuEgpebiWlihQI')}
                  {...register('lastName')}
                />
                <DisplayMessage
                  message={{
                    type: 'error',
                    message: <ValidationFeedback messageSlug={errors?.lastName?.message} />,
                  }}
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="secondary"
              className={styles.submit}
              disabled={isLoading || isSubmitting}
            >
              {t('SWOnElHCrMVq17HDVjK6u')}
            </Button>
            <Button
              type="button"
              variant="primary"
              className={styles.cancel}
              disabled={isLoading || isSubmitting}
              onClick={() => {
                toggleEditName();
                reset();
              }}
            >
              {t('CVrkwmzVSFjUNa7fDJ5qc')}
            </Button>
          </form>
        )}
      </div>
      <DisplayMessage message={message} />
    </div>
  );
};

export default NameInput;
