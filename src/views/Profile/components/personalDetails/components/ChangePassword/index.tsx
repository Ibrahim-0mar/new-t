'use client';
import Button from '@/components/common/base/Button';
import DisplayMessage from '@/components/common/base/DisplayMessage';
import Input from '@/components/common/base/Input';
import { cn } from '@/utils/helper/tailwind_cn';
import useMessageDisplay from '@/utils/hooks/useMessageDisplay';
import { UpdatePassSchema } from '@/utils/schemas/AuthSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updatePassAPI } from '../../actions/actions';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';

interface FormType {
  newPassword: string;
  confirmPassword: string;
}

const ChangePassForm = () => {
  const t = useTranslations();

  const [showForm, setShowForm] = useState<boolean>(false);
  const { message, setMessageDisplay } = useMessageDisplay();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isLoading, isSubmitting, errors },
  } = useForm<FormType>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(UpdatePassSchema),
  });

  const onSubmit: SubmitHandler<FormType> = async (values) => {
    try {
      const { success, message } = await updatePassAPI(values);
      if (success) {
        toggleEditName();
        setMessageDisplay('success', t('GMCFs9U_HE0yYmn1Pgy7W'));
        reset();
      } else {
        setMessageDisplay('error', message);
      }
    } catch (err: any) {
      setMessageDisplay('error', t('5bXQAmtrW47u6v3-CTPZq'));
    }
  };

  const toggleEditName = () => setShowForm((prevState) => !prevState);
  return (
    <div className={styles.container}>
      <div className={cn('flex gap-5')}>
        <p className={styles.detailKey}>{t('FaEh34upcG2sI3wrSbSqO')}</p>
        {!showForm ? (
          <div className={styles.valueContainer}>
            <p className={cn(styles.middleSpan, true && 'font-bold capitalize')}>*********</p>
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
                    errors?.newPassword && 'border-red-500 focus-visible:ring-transparent',
                  )}
                  placeholder={t('OzxFxBhOGMiO-dEa50LVv')}
                  {...register('newPassword')}
                  type="password"
                />
                <DisplayMessage
                  message={{
                    type: 'error',
                    message: <ValidationFeedback messageSlug={errors?.newPassword?.message} />,
                  }}
                />
              </div>
              <div className="w-full">
                <Input
                  className={cn(
                    styles.input,
                    errors?.confirmPassword && 'border-red-500 focus-visible:ring-transparent',
                  )}
                  placeholder={t('an07u7T2Sw-mm4VdFPvBw')}
                  {...register('confirmPassword')}
                  type="password"
                />
                <DisplayMessage
                  message={{
                    type: 'error',
                    message: <ValidationFeedback messageSlug={errors?.confirmPassword?.message} />,
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

export default ChangePassForm;
