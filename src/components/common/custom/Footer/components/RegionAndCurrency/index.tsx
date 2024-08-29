"use client"

import { useLocale, useTranslations } from "next-intl"
import styles from './index.module.css';
import { cn } from "@/utils/helper/tailwind_cn";
import Image from "next/image";
import { languagesMap } from "@/services/data/languages";
import { locale } from "@/navigation";
import { defaultCurrency } from "@/services/data/common";
import { globalDataGetter } from "@/utils/helper/cookies/globalDataGetter";
import { backendImagesUrl } from "@/utils/config";
import { Dot } from "lucide-react";
import { useRegionContext } from "@/utils/lib/providers/RegionProvider/RegionProvider";

export default function RegionAndCurrency() {
  const t = useTranslations();
  const locale = useLocale() as locale;

  const { dispatch } = useRegionContext();

  const language = languagesMap.find((l) => l.code === locale);

  const currency = globalDataGetter('client', 'currency') || defaultCurrency;
  const country = globalDataGetter('client', 'country');

  const countryFlag = backendImagesUrl + `/public/images/flags/${country?.code?.toLowerCase() || 'us'}.svg`;


  return (
    <div className={styles.descktopSections}>
      <h4>{t('VVRH5ZudAcUcjYpuG2rIt')}</h4>
      <button className={cn(styles.regionButton)} onClick={() => dispatch({ type: "SET_REGION_MODAL", payloud: true })}>
        <Image
          src={countryFlag}
          alt={t('amYU-eUKHfZmgN1ZqAsbN')}
          className={styles.flag}
          width={20}
          height={0}
        />
        <span className={styles.regiontext}>
          {country?.name ? country?.name : t('Oy7HK_yQDVPJ7zKsHELcE')}
        </span>
        <Dot />
        <span className={styles.regiontext}>
          {language?.name ? language?.name : t('OMoBgS_yCTPbETaQ3S0T-')}
        </span>
        <Dot />
        <span className={styles.regiontext}>
          {currency?.code ? currency?.code : t('0ow338m6JQFyoiZI4ifo2')}
        </span>
      </button>
  </div>
  )
}
