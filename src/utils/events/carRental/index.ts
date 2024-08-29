import { carRentalSearchStart } from '@/utils/tracking/carRental';
import { withDataLayerClearing } from '../dataLayerClearing';

export const eventsOnClickCarRentalSearch = withDataLayerClearing((data: any) => {
  carRentalSearchStart(data);
});
