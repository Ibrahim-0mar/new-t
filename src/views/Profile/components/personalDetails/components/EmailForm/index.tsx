'use client';
import Button from '@/components/common/base/Button';
import DisplayMessage from '@/components/common/base/DisplayMessage';
import Input from '@/components/common/base/Input';
import { cn } from '@/utils/helper/tailwind_cn';
import useMessageDisplay from '@/utils/hooks/useMessageDisplay';
import { UpdateEmailSchema } from '@/utils/schemas/AuthSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateEmailAPI, verifyEmailAPI } from '../../actions/actions';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';

interface Props {
  email: string;
}

interface FormType {
  email: string;
  confirmCode?: string;
}

const EmailForm: React.FC<Props> = ({ email }) => {
  const t = useTranslations();

  const { data: session, update } = useSession();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [shoeCodeField, setShowCodeField] = useState<boolean>(false);
  const { message, setMessageDisplay } = useMessageDisplay();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isLoading, isSubmitting, errors },
  } = useForm<FormType>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(UpdateEmailSchema),
  });

  const onSubmit: SubmitHandler<FormType> = async (values) => {
    try {
      if (!values.confirmCode && !shoeCodeField) {
        const { success, message } = await updateEmailAPI(values);
        if (success) {
          setMessageDisplay('success', t('YioSoYthf1inYlutFElmO'));
          setShowCodeField(true);
        } else {
          setMessageDisplay(
            'error',
            message === '405' ? t('odeO9cBlDXoZkbI8abOKL') : t('5bXQAmtrW47u6v3-CTPZq'),
          );
        }
      } else {
        if (!values.confirmCode) return setMessageDisplay('error', t('oAx9s-ps55uoV1Z-7DECC'));

        const { success } = await verifyEmailAPI(values as { email: string; confirmCode: string });

        if (success) {
          update({ ...session, user: { ...session?.user, ...values } });
          setMessageDisplay('success', t('6GNqCMfsjuKQbnyQr_SX7'));
          reset();
          toggleEditName();
          setShowCodeField(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setMessageDisplay('error', t('5bXQAmtrW47u6v3-CTPZq'));
        }
      }
    } catch (err: any) {
      setMessageDisplay('error', t('5bXQAmtrW47u6v3-CTPZq'));
    }
  };

  const toggleEditName = () => setShowForm((prevState) => !prevState);

  return (
    <div className={styles.container}>
      <div className={cn('flex gap-5')}>
        <p className={styles.detailKey}>{t('2M0agmuHB7Jaoos761Hrt')}</p>
        {!showForm ? (
          <div className={styles.valueContainer}>
            <p className={cn(styles.middleSpan, true && 'font-bold')}>
              {watch('email') ? watch('email') : email}
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
                    errors?.email && 'border-red-500 focus-visible:ring-transparent',
                  )}
                  placeholder={t('IA12Bc9kXDb0PLrUieeGk')}
                  {...register('email')}
                  type="email"
                />
                <DisplayMessage
                  message={{
                    type: 'error',
                    message: <ValidationFeedback messageSlug={errors?.email?.message} />,
                  }}
                />
              </div>
              {shoeCodeField && (
                <div className="w-full">
                  <Input
                    className={cn(
                      styles.input,
                      errors?.confirmCode && 'border-red-500 focus-visible:ring-transparent',
                    )}
                    placeholder={t('u7aXVnlVzALNxCsPWFj9l')}
                    {...register('confirmCode')}
                  />
                  <DisplayMessage
                    message={{
                      type: 'error',
                      message: <ValidationFeedback messageSlug={errors?.confirmCode?.message} />,
                    }}
                  />
                </div>
              )}
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
                setShowCodeField(false);
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

export default EmailForm;
