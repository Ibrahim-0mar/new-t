type Coordinate = {
  lat: number;
  lng: number;
};

export type DetailsContent = {
  hideBtn: string;
  startAddress: string;
  distance: string;
  duration: string;
  otherRoutes: string;
};

export interface LocationProps {
  variant: 'location';
  coordinate: Coordinate;
  from?: Coordinate;
  to?: Coordinate;
  withDetails?: boolean;
  withRouteAlternatives?: boolean;
  zoom?: number;
  className?: string;
  children?: React.ReactNode;
}
export interface RideProps {
  variant: 'ride';
  from: Coordinate;
  to: Coordinate;
  withDetails: boolean;
  withRouteAlternatives: boolean;
  coordinate?: Coordinate;
  zoom?: number;
  className?: string;
  children?: React.ReactNode;
}
export interface MapComponentAllProps {
  variant?: 'ride' | 'location';
  from?: Coordinate;
  to?: Coordinate;
  withDetails?: boolean;
  withRouteAlternatives?: boolean;
  coordinate?: Coordinate;
  zoom?: number;
  className?: string;
  children?: React.ReactNode;
}
