import { FunctionComponent } from 'react';

type CountryItemsProps = {
  item: any;
};

const CountryItems: FunctionComponent<CountryItemsProps> = ({ item }) => {
  return (
    <div>
      <span>{item.name}</span>
    </div>
  );
};

export default CountryItems;
