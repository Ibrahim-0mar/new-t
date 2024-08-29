'use client';
import Image from 'next/image';
import styles from './index.module.css';
import Button from '../../base/Button';
import {  useTranslations } from 'next-intl';


type ClearFiltersType = {
  imageSrc: string;
  handleClear: () => void;
  errorMessage?:string;
  buttonText?:string
};
const ClearFilters = ({ imageSrc, handleClear ,errorMessage,buttonText}: ClearFiltersType) => {
  const t = useTranslations();

  return (
    <div className={styles.container}>
      <Image src={imageSrc} height={0} width={300} alt="clear filters icon" />
      <p className={styles.text}>{errorMessage || t('-jK5vP2qFkRAyKlqEN9bS')}</p>
      <Button variant="secondary" className={styles.button} onClick={() => handleClear()}>
        {buttonText || t('4QRYjNp4KsieyIvAsbDHT')}
      </Button>
    </div>
  );
};
export default ClearFilters;
