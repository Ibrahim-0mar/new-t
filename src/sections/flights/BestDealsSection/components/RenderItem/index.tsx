import BestDealsCard from '@/components/flights/cards/BestDealsCard';
import { BestDealsCardType, placeType } from '@/utils/types/flights';

const RenderItem = ({
  item,
  currencyCode,
  origin,
  cardClassName,
}: {
  item: BestDealsCardType;
  currencyCode?: string;
  origin: placeType;
  cardClassName?: string;
}) => {
  return (
    <BestDealsCard
      id={item.id}
      image={item.image}
      origin={origin}
      destination={item.city?.name}
      prices={item.prices}
      city={item.city}
      currencyCode={currencyCode!}
      destinationCity={item?.destinationCity}
      cardClassName={cardClassName}
    />
  );
};

export default RenderItem;
