'use client';
import Button from '@/components/common/base/Button';
import LoadingSpinner from '@/components/common/base/LoadingSpinner';
import { cn } from '@/utils/helper/tailwind_cn';
import { LocationProps, MapComponentAllProps, RideProps } from '@/utils/types/googleMap';
import {
  APIProvider,
  Map,
  Marker,
  useApiIsLoaded,
  useDirectionsService,
} from '@vis.gl/react-google-maps';
import { UnfoldVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import Details from './components/details';
import styles from './index.module.css';
import { useLocale, useTranslations } from 'next-intl';
import { locale } from '@/navigation';

const MapComponent = ({
  children,
  from,
  to,
  withDetails = false,
  withRouteAlternatives = true,
  zoom = 14,
  variant = 'ride',
  coordinate,
  className,
}: MapComponentAllProps) => {
  const locale = useLocale() as locale;
  const t=useTranslations();
  const { directionsService, directionsRenderer } = useDirectionsService({
    renderOnMap: true,
    renderOptions: {
      suppressMarkers: true,
    },
  });
  const status = useApiIsLoaded();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState<number>(0);
  const [toggleDetails, setToggleDetails] = useState<boolean>(false);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    if (variant === 'ride')
      directionsService
        .route({
          origin: from!,
          destination: to!,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: withRouteAlternatives,
          language: locale,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
          setRoutes(response.routes);
        })
        .catch((err: Error) => {
          throw new Error(err.message);
        });
  }, [directionsService, directionsRenderer]);

  useEffect(() => {
    if (variant !== 'ride') return;
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  return (
    <>
      {status ? (
        <div id="map" className={cn(styles.mapContainer, className)}>
          <Map
            zoom={zoom}
            center={from || coordinate}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            {children}
            {variant === 'ride' && withDetails && routes.length > 0 ? (
              <div className="max-lg:hidden">
                {toggleDetails ? (
                  <Details
                    routeIndex={routeIndex}
                    routes={routes}
                    setRouteIndex={setRouteIndex}
                    toggleDetails={setToggleDetails}
                    withRouteAlternatives={withRouteAlternatives}
                  />
                ) : (
                  <Button
                    variant="default"
                    className={cn(styles.toggleBtn, styles.showBtn)}
                    onClick={() => setToggleDetails(!toggleDetails)}
                  >
                    {t('iq9DCevmVNGqOH2nKMoVw')}
                    <UnfoldVertical size={15} />
                  </Button>
                )}
              </div>
            ) : null}
            {variant === 'ride' && (
              <>
                <Marker position={from} />
                <Marker position={to} />
              </>
            )}
            {variant === 'location' && <Marker position={coordinate} />}
          </Map>
        </div>
      ) : (
        <div className={styles.spinnerContainer}>
          <LoadingSpinner />
        </div>
      )}
      <div className="flex justify-center lg:hidden">
        {toggleDetails ? (
          <Details
            routeIndex={routeIndex}
            routes={routes}
            setRouteIndex={setRouteIndex}
            toggleDetails={setToggleDetails}
            withRouteAlternatives={withRouteAlternatives}
          />
        ) : (
          <Button
            variant="default"
            className={cn(styles.toggleBtn, styles.showBtn)}
            onClick={() => setToggleDetails(!toggleDetails)}
          >
            {t('iq9DCevmVNGqOH2nKMoVw')}
            <UnfoldVertical size={15} />
          </Button>
        )}
      </div>
    </>
  );
};

const GoogleMap = ({
  from,
  to,
  withDetails,
  withRouteAlternatives,
  zoom,
  variant,
  coordinate,
  className,
  children,
}: RideProps | LocationProps) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}>
      <MapComponent
        variant={variant}
        from={from}
        to={to}
        withDetails={withDetails}
        withRouteAlternatives={withRouteAlternatives}
        zoom={zoom}
        coordinate={coordinate}
        className={className}
      >
        {children}
      </MapComponent>
    </APIProvider>
  );
};

export default GoogleMap;
