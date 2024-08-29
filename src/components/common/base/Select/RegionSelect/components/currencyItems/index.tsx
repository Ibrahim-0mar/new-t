import { FunctionComponent } from 'react';

type CurrencyItemsProps = {
  item: any;
};

const CurrencyItems: FunctionComponent<CurrencyItemsProps> = ({ item }) => {
  return (
    <div>
      <span>{item.name}</span>
      {''} <span>{`(${item.code})`}</span>
    </div>
  );
};

export default CurrencyItems;
