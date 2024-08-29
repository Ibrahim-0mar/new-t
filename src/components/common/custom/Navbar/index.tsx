import { locale } from '@/navigation';
import { getNearbyAirport } from '@/services/apis/common/airports';
import { globalDataGetter } from '@/utils/helper/cookies/globalDataGetter';
import NavBarComponent from './components/NavBarComponent';

const index = async ({ locale }: { locale: locale }) => {
  const [sessionId, airports] = await Promise.all([
    globalDataGetter('server', 'sessionId'),
    getNearbyAirport(locale),
  ]);

  return <NavBarComponent sessionId={sessionId} airports={airports} locale={locale} />;
};

export default index;
