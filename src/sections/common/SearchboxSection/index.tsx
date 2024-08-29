import Container from '@/components/common/base/Container';
import DefaultSearchbox from '@/components/common/custom/searchboxes/DefaultSearchbox';
import DefaultSearchboxMobile from '@/components/common/custom/searchboxes/DefaultSearchbox/mobile';
import { locale } from '@/navigation';
import { fetchPlacesRequest } from '@/services/apis/flights/places';
import { commonImgUrl } from '@/utils/helper/imgUrl';
import { cn } from '@/utils/helper/tailwind_cn';
import { FlightSearchData } from '@/utils/types/common';
import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import Image from 'next/image';
import styles from './index.module.css';

type SearchboxType = {
  bgImage?: string;
  activeTab: string;
  header: string | null;
  data?: FlightSearchData;
  isDynamicPage?: boolean;
  locale?: locale;
};

const SearchboxSection = async ({
  activeTab,
  header,
  bgImage = 'homeBackground.png',
  data,
  isDynamicPage = false,
  locale,
}: SearchboxType) => {
  const t = await getTranslations();

  const headerLastWord = header ? header.split(' ')[header.split(' ').length - 1] : '';
  const restofHeader = header ? header.substring(0, header.length - headerLastWord.length) : '';
  const deviceView = headers().get('x-viewport');
  const place = await fetchPlacesRequest(data?.origins as any, locale!);

  return (
    <>
      {deviceView === 'desktop' ? (
        <section className={styles.wrapper}>
          <div id="desktop" className={styles.headerContainer}>
            <Image
              src={commonImgUrl(bgImage)}
              alt={header ? header : t('HvUrlBh0fVF3I2xE0NxmP')}
              className={styles.image}
              priority
              fill
            />
            <Container className="flex justify-end">
              <p className={cn(styles.headerText, isDynamicPage && styles.dynamicPageHeaderText)}>
                {restofHeader}
                <span className={styles.focusText}>{headerLastWord}</span>
              </p>
            </Container>
          </div>
          <div className={styles.searchboxContainer}>
            <DefaultSearchbox activeTab={activeTab} data={data} origin={place[0]} />
          </div>
        </section>
      ) : (
        <section className="flex w-full items-center justify-center">
          <DefaultSearchboxMobile activeTab={activeTab} data={data} />
        </section>
      )}
      <div className="sr-only" aria-hidden={true} id="solo_advertiser"></div>
    </>
  );
};

export default SearchboxSection;
