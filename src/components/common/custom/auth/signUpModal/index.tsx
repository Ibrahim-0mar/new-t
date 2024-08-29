import Login_logo from '@/../public/Logos/LOGIN.png';
import Button from '@/components/common/base/Button';
import DisplayMessage from '@/components/common/base/DisplayMessage';
import Input from '@/components/common/base/Input';
import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import travolicAxios from '@/services/apis/api';
import useMessageDisplay from '@/utils/hooks/useMessageDisplay';
import { SignUpSchema } from '@/utils/schemas/AuthSchemas';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { SignUpFormType } from '@/utils/types/auth';
import { activeSocialModal } from '@/utils/types/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './index.module.css';
import { eventsOnSugnUpStart } from '@/utils/events/common';

const SignUpModal = ({
  setActiveModal,
}: {
  setActiveModal: React.Dispatch<React.SetStateAction<activeSocialModal>>;
}) => {
  const t = useTranslations();
  const { message, setMessageDisplay } = useMessageDisplay();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { isLoading, isSubmitting, errors },
    reset,
  } = useForm<SignUpFormType>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      // phoneNumber: '',
    },
  });

  const signUpInputs = [
    {
      id: 'email',
      type: 'email',
      placeholder: t('5GCsxNRNlvKsektb4m--5'),
      ariaLabel: t('5GCsxNRNlvKsektb4m--5'),
      autocomplete: 'email',
    },
    {
      id: 'password',
      type: 'password',
      placeholder: t('Wu2TR_hpL9qpy3CgZE8R4'),
      ariaLabel: t('FaEh34upcG2sI3wrSbSqO'),
      autocomplete: 'new-password',
    },
    {
      id: 'confirmPassword',
      type: 'password',
      placeholder: t('uxbGX5EVZT8Y3iMWvln4L'),
      ariaLabel: t('uxbGX5EVZT8Y3iMWvln4L'),
      autocomplete: 'new-password',
    },
    {
      id: 'phoneNumber',
      type: 'string',
      placeholder: t('E_zDgyVbkJC1sKhioiXXO'),
      ariaLabel: t('ajkUZsKZuFti9t8kM9431'),
      autocomplete: 'tel',
    },
  ];

  const onSubmit: SubmitHandler<SignUpFormType> = async (values) => {
    try {
      const { data }: { data: { status: string; message: string } } = await travolicAxios.post(
        '/auth/register',
        {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          // phoneNumber: values.phoneNumber,
        },
      );

      if (data.status === 'success') {
        setMessageDisplay('success', data.message);
        reset();
        localStorage.setItem('needConfirmation', values.email);
        eventsOnSugnUpStart('email', 'normal');
        setTimeout(() => {
          setActiveModal('confirm');
        }, 1000);
      }
    } catch (err: any) {
      setMessageDisplay('error', err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.logoContainer}>
        <Image src={Login_logo} alt={t('JCEI-mgHtVXBCx1m5X14Y')} width={0} height={200} />
      </div>

      <div className={style.inputsContainer}>
        {signUpInputs.map((input) => (
          <div key={input.id}>
            <div className="relative">
              <Input
                id={input.id}
                {...register(input.id)}
                type={
                  input.id === 'password'
                    ? showPassword
                      ? 'text'
                      : 'password'
                    : input.id === 'confirmPassword'
                      ? showConfirmPassword
                        ? 'text'
                        : 'password'
                      : input.type
                }
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
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      showPassword ? setShowPassword(false) : setShowPassword(true);
                    }
                  }}
                >
                  {input.id === 'password' &&
                    (showPassword ? (
                      <EyeOff onClick={() => setShowPassword(false)} />
                    ) : (
                      <Eye onClick={() => setShowPassword(true)} />
                    ))}
                  {input.id === 'confirmPassword' &&
                    (showConfirmPassword ? (
                      <EyeOff onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                      <Eye onClick={() => setShowConfirmPassword(true)} />
                    ))}
                </div>
              )}
            </div>
            {errors[input.id as keyof SignUpFormType]?.message && (
              <p className={style.errorMessage}>
                <ValidationFeedback
                  messageSlug={errors[input.id as keyof SignUpFormType]?.message}
                />
              </p>
            )}
          </div>
        ))}
        {/* display api response */}
        <DisplayMessage message={message} />
      </div>
      <div className={style.buttonsContainer}>
        <Button
          type="submit"
          isLoading={isLoading || isSubmitting}
          aria-label={t('UukF2iQNvar9yBoKYPlzS')}
          variant="default"
          className={style.submitButton}
        >
          {isLoading || isSubmitting ? <LoadingSpinner /> : t('UukF2iQNvar9yBoKYPlzS')}
        </Button>
        <div className="mx-auto">
          <p className="text-sm font-medium text-primary">
            {t('LtZJkfEqtJLRCL41RoJMa')}
            <Button
              onClick={() => setActiveModal('email')}
              aria-label={t('I4SQOxxbXFdB0knuhbt_Q')}
              role="navigation"
              variant="default"
              className={style.alreadyHaveAccountButton}
            >
              {t('tn9yGXrGEEM0wBUP5_TBe')}
            </Button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignUpModal;
