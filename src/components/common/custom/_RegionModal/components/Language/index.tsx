'use client';
import RegionSelect from '@/components/common/base/Select/RegionSelect';
import languages from '@/services/data/languages';
import { language } from '@/utils/types/common';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import styles from './index.module.css';
import { defaultLanguage } from '@/services/data/common';
import { useTranslations } from 'next-intl';
type LanguageProps = {
  language: language;
  handleChange: Dispatch<SetStateAction<language>>;
};

const Language: FunctionComponent<LanguageProps> = ({ language, handleChange }) => {
  const t = useTranslations();

  const languageValue = {
    name: language?.name,
    country: language?.country,
  };

  const handleLanguageChange = (language: language) => {
    handleChange(language);
  };

  return (
    <div>
      <RegionSelect
        selected={language}
        menuClassName={styles.options}
        inputClassName={styles.inputClassName}
        itemClassName={styles.itemClassName}
        options={languages}
        label={<h4 className={styles.inputTitle}>{t('MpWrxopxYh9TZaVXDLRDI')}</h4>}
        placeholder={t('-Zhd8xv21dtkctC4RbG-o')}
        itemsType="language"
        handleChange={handleLanguageChange}
        defaultValue={
          languageValue.name
            ? `${languageValue.name} (${languageValue.country})`
            : `${defaultLanguage.name} (${defaultLanguage.country})`
        }
      />
    </div>
  );
};

export default Language;
