'use client';
import Button from '@/components/common/base/Button';
import DisplayMessage from '@/components/common/base/DisplayMessage';
import Input from '@/components/common/base/Input';
import { cn } from '@/utils/helper/tailwind_cn';
import useMessageDisplay from '@/utils/hooks/useMessageDisplay';
import { UpdateDisplayNameSchema } from '@/utils/schemas/AuthSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateDisplayNameAPI } from '../../actions/actions';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';

interface FormType {
  displayName: string;
}

const DisplayNameForm: React.FC<FormType> = ({ displayName }) => {
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
      displayName,
    },
    resolver: yupResolver(UpdateDisplayNameSchema),
  });

  const onSubmit: SubmitHandler<FormType> = async (values) => {
    try {
      const { success } = await updateDisplayNameAPI(values.displayName);

      if (success) {
        update({ ...session, user: { ...session?.user, ...values } });
        toggleEditName();
        setMessageDisplay('success', t('VJufD46xJU15AxfWrGQaU'));
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
        <p className={styles.detailKey}>{t('_h0YyKSOzNtBKrwMehQiT')}</p>
        {!showForm ? (
          <div className={styles.valueContainer}>
            <p className={cn(styles.middleSpan, true && 'font-bold capitalize')}>
              {watch('displayName')}
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
            <div className="w-full">
              <Input
                className={cn(
                  styles.input,
                  errors?.displayName && 'border-red-500 focus-visible:ring-transparent',
                )}
                placeholder="Enter your first name"
                {...register('displayName')}
              />
              <DisplayMessage
                message={{
                  type: 'error',
                  message: <ValidationFeedback messageSlug={errors?.displayName?.message} />,
                }}
              />
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

export default DisplayNameForm;
