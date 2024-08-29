import { cn } from '@/utils/helper/tailwind_cn';
import Button from '../../base/Button';
import styles from './index.module.css';
import { useTranslations } from 'next-intl';
type ShowHideProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  className?: string;
  showMessage?: string;
  hideMessage?: string;
};
const ShowHideButton = ({ show, setShow, className, showMessage, hideMessage }: ShowHideProps) => {
  const t = useTranslations();

  return (
    <>
      {!show ? (
        <Button
          variant="default"
          aria-label={t('K2CRbx0eOLGfeCqWH8K1I')}
          className={cn(styles.showButton, className)}
          onClick={() => setShow(true)}
        >
          {showMessage || t('K2CRbx0eOLGfeCqWH8K1I')}
        </Button>
      ) : (
        <Button
          variant="default"
          aria-label={t('xHbJNMMDHIcGxe4Ytga08')}
          className={cn(styles.showButton, className)}
          onClick={() => setShow(false)}
        >
          {hideMessage || t('xHbJNMMDHIcGxe4Ytga08')}
        </Button>
      )}
    </>
  );
};

export default ShowHideButton;
