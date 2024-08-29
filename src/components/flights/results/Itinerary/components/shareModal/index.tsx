'use client';
import Button from '@/components/common/base/Button';
import Input from '@/components/common/base/Input';
import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import Modal from '@/components/common/base/Modal';
import { shareFlightRequest } from '@/services/apis/flights/share';
import { userData } from '@/utils/helper/userData';
import { shareModalSchema } from '@/utils/schemas/common';
import { ShareModalForm } from '@/utils/types/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './index.module.css';
import { handleOpenModal } from '@/utils/modals';
import { useLocale, useTranslations } from 'next-intl';
import { locale, useRouter } from '@/navigation';
import ValidationFeedback from '@/utils/schemas/ValidationFeedback';
import { TicketViewTrackingData } from '@/utils/types/flights';
import { eventsOnFlightShare } from '@/utils/events/flights/search';

type ShareInput = {
  id: 'yourEmail' | 'toEmail' | 'message';
  label?: string;
  placeHolder: string;
  type: 'text' | 'textarea';
};

interface Props {
  legs: TransformedLegType[];
  price: number;
  shareFlightTrakingData?: TicketViewTrackingData | false;
}

const ShareModal = ({
  legs,
  shareFlightTrakingData
  // price
}: Props) => {
  const locale = useLocale() as locale;
  const t=useTranslations();


  // const { code: currencyCode } = globalDataGetter('client', 'currency') || defaultCurrency;
  const router = useRouter();
  const [copyStatus, setCopyStatus] = useState(t('b3ca3gXexXP3ZR2Vhc7_D'));
  const session = useSession();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [IsSent, setIsSent] = useState<boolean>(false);
  const [submitBtnText, setSubmitBtnText] = useState<string>(t('78_r8LcY1-QfAPpT-KHQt'));
  const { token } = session.status === 'authenticated' ? userData(session) : { token: '' };
  const codesAndNames = legs.map(
    (leg) =>
      `${leg.segments[0].originDetails.name} (${leg.segments[0].origin}) - ${leg.segments[leg.segments.length - 1].destinationDetails.name} (${leg.segments[leg.segments.length - 1].destination})`,
  );

  const handleShareLink = (defaultHref: string) => {
    const url = new URL(defaultHref);
    const params = new URLSearchParams(url.search);

    params.delete('sharemodal');
    params.delete('solo_open');
    params.set("utm_source", "share")
    url.search = params.toString();

    return url.href;
  };

  const {
    register,
    handleSubmit,
    formState: { isLoading, isSubmitting, errors },
    reset,
  } = useForm<ShareModalForm>({
    resolver: yupResolver(shareModalSchema),
  });


  const inputs: ShareInput[] = [
    {
      id: 'yourEmail',
      label: t('ONJcqFMKQ4fc4-S3AVo4k'),
      placeHolder: t('z1Nc6ISmLNlWOO4cuzImO'),
      type: 'text',
    },
    {
      id: 'toEmail',
      label: t('W0N8kNdoubiI3VA-7Gh-o'),
      placeHolder: t('-wuxlhoEykT25ePCF58CR'),
      type: 'text',
    },
    {
      id: 'message',
      placeHolder: t('a8kv4FDdDekakVrnYy47N'),
      type: 'textarea',
    },
  ];
  const onSubmit: SubmitHandler<ShareModalForm> = async (e: FieldValues) => {
    try {
      await shareFlightRequest(e.toEmail, handleShareLink(window.location.href), token, locale);
      reset();
      setSubmitBtnText(t('Zrz-_HCEv14JFzRAWaAtq'));
      setIsSent(true);

      // Tracking Event
      if(shareFlightTrakingData)  eventsOnFlightShare(shareFlightTrakingData)
    } catch (error: any) {
      setErrorMessage(t('bWNhn4gJUsjZVQMZyFK5F'));
      setIsSent(false);
    }
  };

  useEffect(() => {
    if (session.status !== 'authenticated') {
      setErrorMessage(t('ZkY8XgGP4Cpy6DlRZS2lv'));
    } else setErrorMessage(null);
  }, [errorMessage, session.data?.user, session.status]);

  useLayoutEffect(() => {
    setCopyStatus(t('b3ca3gXexXP3ZR2Vhc7_D'));
    setSubmitBtnText(t('78_r8LcY1-QfAPpT-KHQt'));
    setIsSent(false);
    reset();
  }, [searchParams.get('sharemodal')]);

  return (
    <div>
      <Icon
        icon="fa6-solid:share"
        width="24"
        height="24"
        style={{ color: 'black', cursor: 'pointer' }}
        onClick={() => {
          handleOpenModal('sharemodal', searchParams, router);
        }}
      />

      {/* Modal */}
      <Suspense fallback={<div />}>
        <Modal
          id="share"
          grandClassName={styles.grandClassName}
          nestedClassName={styles.nestedClassName}
        >
          {/* <Image
            src={commonImgUrl('coloredLogo.png')}
            width={200}
            height={0}
            alt=""
          /> */}
          <div className={styles.container}>
            <div className={styles.headerDetails}>
              <h2 className={styles.heading}>{t('h5E4OJGhXrUTaVHgmDdl_')}</h2>
              {codesAndNames.map((item, index) => (
                <p key={index} className={styles.flightPath}>
                  {item}
                </p>
              ))}
            </div>
            {/* <span className={styles.price}>{<FormatPrice price={price} currency={currencyCode} />}</span> */}
            <div id="link" className={styles.shareLinkContainer}>
              <label htmlFor="shareLink" className={styles.label}>
                {t('OmyJOfpnHDNfM0IVWRUw0')}
              </label>
              <div className={styles.linkInputContainer}>
                <Input
                  id="shareLink"
                  type="text"
                  value={handleShareLink(window.location.href)}
                  className={styles.linkInput}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(handleShareLink(window.location.href));
                    setCopyStatus(t('kfu40aAytZSIn3u-fDb_8'));
                  }}
                  className={styles.CopyBtn}
                >
                  {copyStatus}
                </Button>
              </div>
            </div>
            <form id="share form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              {inputs.map((input) => (
                <div key={input.id} className={styles.inputContainer}>
                  {input.label && (
                    <label htmlFor={input.id} className={styles.label}>
                      {input.label}
                    </label>
                  )}

                  {input.type === 'text' ? (
                    <Input
                      className={styles.input}
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeHolder}
                      {...register(input.id)}
                    />
                  ) : (
                    <textarea
                      className={styles.textArea}
                      id={input.id}
                      placeholder={input.placeHolder}
                      {...register(input.id)}
                    />
                  )}
                  {errors[input.id]?.message && (
                    <p className={styles.invalidValue}>
                      <ValidationFeedback messageSlug={errors[input.id]?.message} />
                    </p>
                  )}
                </div>
              ))}
              <div className={styles.errorMessageContainer}>
                {errorMessage && <p className={styles.invalidValue}>{errorMessage}</p>}
                {IsSent && <p className={styles.successMessage}>{t('udk1Xo9NT3RvewaJ6Lr5N')}</p>}
                {session.status !== 'authenticated' && (
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      const newSearchParams = new URLSearchParams(searchParams);
                      router.push(`?authmodal=open&${newSearchParams}`);
                    }}
                    className={styles.authBtn}
                  >
                    {t('I4SQOxxbXFdB0knuhbt_Q')}
                  </Button>
                )}
              </div>
              <Button
                type="submit"
                variant="secondary"
                onClick={handleSubmit(onSubmit)}
                disabled={!session.data?.user}
                isLoading={isLoading || isSubmitting}
                className={styles.shareBtn}
              >
                {isLoading || isSubmitting ? <LoadingSpinner /> : submitBtnText}
              </Button>
            </form>
          </div>
        </Modal>
      </Suspense>
    </div>
  );
};

export default ShareModal;
