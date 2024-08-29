import Login_logo from '@/../public/Logos/LOGIN.png';
import Button from '@/components/common/base/Button';
import DisplayMessage from '@/components/common/base/DisplayMessage';
import Input from '@/components/common/base/Input';
import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import travolicAxios from '@/services/apis/api';
import useCountdownTimer from '@/utils/hooks/useCountdownTimer';
import useMessageDisplay from '@/utils/hooks/useMessageDisplay';
import { ConfirmEmailSchema } from '@/utils/schemas/AuthSchemas';
import { ConfirmEmailType } from '@/utils/types/auth';
import { activeSocialModal } from '@/utils/types/common';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './index.module.css';
import { useTranslations } from 'next-intl';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { eventsOnSignUpComplete } from '@/utils/events/common';

const ConfirmEmail = ({
  setActiveModal,
}: {
  setActiveModal: React.Dispatch<React.SetStateAction<activeSocialModal>>;
}) => {
  const t = useTranslations();

  const [email] = useState<string>(localStorage.getItem('needConfirmation')!);
  const { message, setMessageDisplay } = useMessageDisplay();
  const { countdown, isDisabled, startTimer } = useCountdownTimer(30);

  const {
    handleSubmit,
    register,
    formState: { isLoading, isSubmitting, errors },
    reset,
  } = useForm<ConfirmEmailType>({
    resolver: yupResolver(ConfirmEmailSchema),
    defaultValues: {
      confirmCode: '',
    },
  });

  const handleResendCode = async () => {
    try {
      const { data }: { data: { status: string; message: string } } = await travolicAxios.post(
        '/auth/resend-code',
        {
          email,
        },
      );

      if (data.status === 'success') {
        setMessageDisplay('success', data.message);
        startTimer();
      }
    } catch (err: any) {
      setMessageDisplay('error', err.response.data.message);
    }
  };

  const onSubmit: SubmitHandler<ConfirmEmailType> = async (values) => {
    try {
      const { data }: { data: { isVerified: boolean; status: string } } = await travolicAxios.post(
        '/auth/confirm-code',
        {
          email,
          ...values,
        },
      );

      if (data.status === 'success') {
        setMessageDisplay('success', t('WLCYLAJ4rk_YcFSFgagrd'));
        reset();
        localStorage.removeItem('needConfirmation');
        eventsOnSignUpComplete("email", email)

        setTimeout(() => {
          setActiveModal('email');
        }, 1000);
      }
    } catch (err: any) {
      setMessageDisplay('error', err.response.data.message);
    }
  };

  const confirmEmailInputs = [
    {
      id: 'confirmCode',
      type: 'string',
      placeholder: t('urtPGKQ7lTcrwppf8yGdZ'),
      ariaLabel: t('OPyTGyJvjeq4_kHCwOXAp'),
      autocomplete: 'code',
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.logoContainer}>
        <Image
          src={Login_logo}
          alt={t('r9gs0vLtvwCfWQehRLQgC')}
          width={0}
          height={200}
          loading="lazy"
        />
      </div>

      <div className={style.inputsContainer}>
        <h1 className={style.header}>{t('TkojyvIGIVwM1kpxO2XnD')}</h1>
        {confirmEmailInputs.map((input) => (
          <div key={input.id}>
            <Input
              id={input.id}
              {...register(input.id as keyof ConfirmEmailType)}
              type={input.type}
              placeholder={input.placeholder}
              aria-label={input.ariaLabel}
              autoComplete={input.autocomplete}
              className={style.formInputs}
            />
            {errors[input.id as keyof ConfirmEmailType]?.message && (
              <p className={style.errorMessage}>
                <ValidationFeedback
                  messageSlug={errors[input.id as keyof ConfirmEmailType]?.message}
                />
              </p>
            )}
          </div>
        ))}
        <DisplayMessage message={message} />
      </div>
      <div className={style.buttonsContainer}>
        <Button
          onClick={handleResendCode}
          isLoading={isDisabled}
          type="button"
          aria-label={t('-LszQHlneYd4TB0bNfQvq')}
          role="navigation"
          variant="default"
          className={style.forgotPassButton}
        >
          {isDisabled ? t('_tisniQ08CNSZsarpJtV2', { countdown }) : t('5372eiJXO38Dyoc9RRVS5')}
        </Button>
        <Button
          type="submit"
          isLoading={isLoading || isSubmitting}
          aria-label={t('0slxBRHtnKWVLkrWGr0F5')}
          variant="default"
          className={style.submitButton}
        >
          {isLoading || isSubmitting ? <LoadingSpinner /> : t('KywqTxqnXOgv14RmJcDfy')}
        </Button>
      </div>
    </form>
  );
};

export default ConfirmEmail;
