import { placeType } from '@/utils/types/flights';
import TopFlights from '../TopFlights';
import TopCountries from '../TopCountries';
import TopNearby from '../TopNearby';

interface RenderActiveSectionProps {
  activeTab: string;
  nearbyAirport: placeType;
  topFlights: any;
  topCountries: any;
  topNearby: any;
}

const RenderActiveSection: React.FC<RenderActiveSectionProps> = ({
  activeTab,
  nearbyAirport,
  topCountries,
  topFlights,
  topNearby,
}) => {
  const _renderActiveSection = () => {
    switch (activeTab) {
      case 'flights':
        return (
          activeTab === 'flights' && <TopFlights origin={nearbyAirport} topFlights={topFlights} />
        );
      case 'countries':
        return (
          activeTab === 'countries' && (
            <TopCountries origin={nearbyAirport} topCountries={topCountries} />
          )
        );
      case 'nearby':
        return activeTab === 'nearby' && <TopNearby origin={nearbyAirport} topNearby={topNearby} />;
      default:
        return <TopFlights origin={nearbyAirport} topFlights={topFlights} />;
    }
  };
  return _renderActiveSection();
};

export default RenderActiveSection;
