import { activeSocialModal } from '@/utils/types/common';
import style from './index.module.css';
import Login_logo from '@/../public/Logos/LOGIN.png';
import Image from 'next/image';
import Input from '@/components/common/base/Input';
import Button from '@/components/common/base/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import { LoginSchema } from '@/utils/schemas/AuthSchemas';
import { signIn } from 'next-auth/react';
import { LoginFormType } from '@/utils/types/auth';
import { hashingEmail } from '@/utils/helper/hash';
import useMessageDisplay from '@/utils/hooks/useMessageDisplay';
import DisplayMessage from '@/components/common/base/DisplayMessage';
import React, { useState, KeyboardEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { eventsOnLoginComplete } from '@/utils/events/common';

const LoginModal = ({
  setActiveModal,
}: {
  setActiveModal: React.Dispatch<React.SetStateAction<activeSocialModal>>;
}) => {
  const t = useTranslations();

  const { message, setMessageDisplay } = useMessageDisplay();
  const {
    handleSubmit,
    register,
    formState: { isLoading, isSubmitting, errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      remeberMe: false,
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginInputs = [
    {
      id: 'email',
      type: 'email',
      placeholder: t('lEnRb4lEa62gQnXzny4rC'),
      ariaLabel: t('uFBAfjt58HAS6qWK1QoY2'),
      autocomplete: 'email',
    },
    {
      id: 'password',
      type: 'password',
      placeholder: t('Wu2TR_hpL9qpy3CgZE8R4'),
      ariaLabel: t('FaEh34upcG2sI3wrSbSqO'),
      autocomplete: 'password',
    },
  ];

  const onSubmit: SubmitHandler<LoginFormType> = async (values) => {
    try {
      const response: any = await signIn('credentials', {
        redirect: false,
        callbackUrl: '/',
        email: values.email,
        password: values.password,
      });

      if (response.error) {
        return setMessageDisplay('error', response.error);
      }

      setMessageDisplay('success', t('jL18VVxvgVXtOD3OpdM24'));
      eventsOnLoginComplete('email', values.email);
      hashingEmail(values.email);
      window.location.reload();
    } catch (err: any) {
      setMessageDisplay('error', err?.message || t('5bXQAmtrW47u6v3-CTPZq'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.logoContainer}>
        <Image src={Login_logo} alt={t('c9vyPhg2joa8_HLGIWU76')} width={0} height={200} />
      </div>

      <div className={style.inputsContainer}>
        {loginInputs.map((input) => (
          <div key={input.id}>
            <div className="relative">
              <Input
                id={input.id}
                {...register(input.id)}
                type={input.type === 'password' && showPassword ? 'text' : input.type}
                placeholder={input.placeholder}
                aria-label={input.ariaLabel}
                autoComplete={input.autocomplete}
                className={style.formInputs}
              />
              {input.type === 'password' && (
                <div
                  tabIndex={0}
                  role="button"
                  aria-label={
                    showPassword ? t('6KIDdyaggi9uy9UgOePOO') : t('0eyd29JyKu3D0G2HM-aIX')
                  }
                  className={style.showPassContainer}
                  onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                    // Add keyboard event handling
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      showPassword ? setShowPassword(false) : setShowPassword(true);
                    }
                  }}
                >
                  {showPassword ? (
                    <EyeOff onClick={() => setShowPassword(false)} />
                  ) : (
                    <Eye onClick={() => setShowPassword(true)} />
                  )}
                </div>
              )}
            </div>
            {errors[input.id as keyof LoginFormType]?.message && (
              <p className={style.errorMessage}>
                <ValidationFeedback
                  messageSlug={errors[input.id as keyof LoginFormType]?.message}
                />
              </p>
            )}
          </div>
        ))}
        {/* display api response */}
        <DisplayMessage message={message} />
      </div>
      <div className={style.buttonsContainer}>
        <div className={style.forgotButtonContainer}>
          <Button
            onClick={() => setActiveModal('forgot-password')}
            aria-label={t('gi-yh_DT1PvdakmZ6xJje')}
            role="navigation"
            variant="default"
            className={style.forgotPassButton}
          >
            {t('gi-yh_DT1PvdakmZ6xJje')}
          </Button>
          <div>
            <label aria-label={t('OgBNTUY-drDkh8KaGjtxA')} className={style.label}>
              <input type="checkbox" className={style.forgotCheckbox} />
              <span className={style.labelText}>{t('OgBNTUY-drDkh8KaGjtxA')}</span>
            </label>
          </div>
        </div>
        <Button
          type="submit"
          aria-label={t('UukF2iQNvar9yBoKYPlzS')}
          isLoading={isLoading || isSubmitting}
          variant="default"
          className={style.submitButton}
        >
          {isLoading || isSubmitting ? <LoadingSpinner /> : t('tn9yGXrGEEM0wBUP5_TBe')}
        </Button>
        <div className={style.alreadyHaveAccountContainer}>
          <p className={style.alreadyHaveAccountText}>
            {t('MENi-wNX2iUjHUERFjgD8')}
            <Button
              onClick={() => setActiveModal('signup')}
              aria-label={t('UukF2iQNvar9yBoKYPlzS')}
              role="navigation"
              variant="default"
              className={style.alreadyHaveAccountButton}
            >
              {t('UukF2iQNvar9yBoKYPlzS')}
            </Button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginModal;
