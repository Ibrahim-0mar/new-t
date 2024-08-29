import Login_logo from '@/../public/Logos/LOGIN.png';
import Button from '@/components/common/base/Button';
import DisplayMessage from '@/components/common/base/DisplayMessage';
import Input from '@/components/common/base/Input';
import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import travolicAxios from '@/services/apis/api';
import useMessageDisplay from '@/utils/hooks/useMessageDisplay';
import { RecoverEmailSchema } from '@/utils/schemas/AuthSchemas';
import { RecoverPassType } from '@/utils/types/auth';
import { activeSocialModal } from '@/utils/types/common';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import style from './index.module.css';
import { useTranslations } from 'next-intl';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';

const RecoverPass = ({
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
    reset,
  } = useForm<RecoverPassType>({
    resolver: yupResolver(RecoverEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const recoverPasswordInputs = [
    {
      id: 'email',
      type: 'email',
      placeholder: t('lEnRb4lEa62gQnXzny4rC'),
      ariaLabel: t('uFBAfjt58HAS6qWK1QoY2'),
      autocomplete: 'email',
    },
  ];

  const onSubmit: SubmitHandler<RecoverPassType> = async (values) => {
    try {
      const { data }: { data: { status: string } } = await travolicAxios.post(
        '/auth/recover-password',
        {
          email: values.email,
        },
      );

      if (data.status === 'success') {
        setMessageDisplay('success', t('_zt1sRwK7cU059oPCaHsp'));
        reset();
        setTimeout(() => {
          setActiveModal('email');
        }, 4000);
      } else {
        setMessageDisplay('error', t('Ka6QMP0GmigsVjwsMVDrj'));
      }
    } catch (err: any) {
      setMessageDisplay('error', t('Ka6QMP0GmigsVjwsMVDrj'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.logoContainer}>
        <Image
          src={Login_logo}
          alt={t('r9gs0vLtvwCfWQehRLQgC')}
          width={0}
          height={200}
          className={style.logo}
          loading="lazy"
        />
      </div>

      <div className={style.inputsContainer}>
        {recoverPasswordInputs.map((input) => (
          <div key={input.id}>
            <Input
              id={input.id}
              {...register(input.id)}
              type={input.type}
              placeholder={input.placeholder}
              aria-label={input.ariaLabel}
              autoComplete={input.autocomplete}
              className={style.formInputs}
            />
            {errors[input.id as keyof RecoverPassType]?.message && (
              <p className={style.errorMessage}>
                <ValidationFeedback
                  messageSlug={errors[input.id as keyof RecoverPassType]?.message}
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
          aria-label={t('j5fCfoe0OQcbdWC-GQtbj')}
          variant="default"
          className={style.submitButton}
        >
          {isLoading || isSubmitting ? <LoadingSpinner /> : t('j5fCfoe0OQcbdWC-GQtbj')}
        </Button>
      </div>
    </form>
  );
};

export default RecoverPass;
