import { FunctionComponent } from 'react';

type LanguageItemsProps = {
  item: any;
};

const LanguageItems: FunctionComponent<LanguageItemsProps> = ({ item }) => {
  return (
    <div>
      <span>{item.name}</span>
      {''} <span>{`(${item.country})`}</span>
    </div>
  );
};

export default LanguageItems;
