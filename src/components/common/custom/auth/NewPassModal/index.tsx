import Login_logo from '@/../public/Logos/LOGIN.png';
import Button from '@/components/common/base/Button';
import DisplayMessage from '@/components/common/base/DisplayMessage';
import Input from '@/components/common/base/Input';
import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import useMessageDisplay from '@/utils/hooks/useMessageDisplay';
import { UpdatePassSchema } from '@/utils/schemas/AuthSchemas';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { newPassFormType } from '@/utils/types/auth';
import { activeSocialModal } from '@/utils/types/common';
import { updatePassAPI } from '@/views/Profile/components/personalDetails/actions/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './index.module.css';

const NewPassModal = ({
  setActiveModal,
}: {
  setActiveModal: React.Dispatch<React.SetStateAction<activeSocialModal>>;
}) => {
  const t = useTranslations();

  const { message, setMessageDisplay } = useMessageDisplay();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isLoading, isSubmitting, errors },
    reset,
  } = useForm<newPassFormType>({
    resolver: yupResolver(UpdatePassSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<newPassFormType> = async (values) => {
    const recover_password = searchParams.get('recover_password');
    const params = new URLSearchParams(searchParams);

    try {
      const { success, message } = await updatePassAPI({ ...values, recover_password });
      if (success) {
        setMessageDisplay('success', t('GMCFs9U_HE0yYmn1Pgy7W'));
        reset();
        params.delete('recover_password');
        router.push(`?${params.toString()}`, { scroll: false });
        setTimeout(() => {
          setActiveModal('email');
        }, 1500);
      } else {
        setMessageDisplay('error', message);
      }
    } catch (err: any) {
      setMessageDisplay('error', t('5bXQAmtrW47u6v3-CTPZq'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.logoContainer}>
        <Image src={Login_logo} alt={t('JCEI-mgHtVXBCx1m5X14Y')} width={0} height={200} />
      </div>

      <div className={style.inputsContainer}>
        <div>
          <div className="relative">
            <Input
              {...register('newPassword')}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('OzxFxBhOGMiO-dEa50LVv')}
              className={style.formInputs}
            />
            <div
              tabIndex={0}
              role="button"
              aria-label={showPassword ? t('6KIDdyaggi9uy9UgOePOO') : t('0eyd29JyKu3D0G2HM-aIX')}
              className={style.showPassContainer}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
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
          </div>
          <DisplayMessage
            message={{
              type: 'error',
              message: <ValidationFeedback messageSlug={errors?.newPassword?.message} />,
            }}
          />
        </div>
        <div>
          <div className="relative">
            <Input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('EzaPhQR3JRBzbij9io6dK')}
              className={style.formInputs}
            />
            <div
              tabIndex={0}
              role="button"
              aria-label={
                showConfirmPassword ? t('6KIDdyaggi9uy9UgOePOO') : t('0eyd29JyKu3D0G2HM-aIX')
              }
              className={style.showPassContainer}
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  showConfirmPassword
                    ? setShowConfirmPassword(false)
                    : setShowConfirmPassword(true);
                }
              }}
            >
              {showConfirmPassword ? (
                <EyeOff onClick={() => setShowConfirmPassword(false)} />
              ) : (
                <Eye onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>
          </div>
          <DisplayMessage
            message={{
              type: 'error',
              message: <ValidationFeedback messageSlug={errors?.newPassword?.message} />,
            }}
          />
        </div>
      </div>
      <DisplayMessage message={message} />
      <div className={style.buttonsContainer}>
        <Button
          type="submit"
          isLoading={isLoading || isSubmitting}
          aria-label={t('NTHkP24kvd-IYoYFLULrN')}
          variant="default"
          className={style.submitButton}
        >
          {isLoading || isSubmitting ? <LoadingSpinner /> : t('NTHkP24kvd-IYoYFLULrN')}
        </Button>
      </div>
    </form>
  );
};

export default NewPassModal;
