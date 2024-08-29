import { APIProvider, InfoWindow, Map, Marker } from '@vis.gl/react-google-maps';
import React, { useState } from 'react';
import LocationToolTip from './components/LocationToolTip';
import styles from './index.module.css';

export interface Location {
  id: number;
  lat: number;
  lng: number;
  title: string;
}

interface SimpleMapProps {
  locations: Location[];
}

const SimpleMap: React.FC<SimpleMapProps> = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY!}>
      <Map
        zoom={7} // Adjusted zoom level for a closer view of Egypt
        center={{ lat: 26.8206, lng: 30.8025 }} // Centered on Egypt
        gestureHandling="greedy" // Allows zooming without holding Ctrl
        mapTypeId="roadmap" // Ensures the map is in default view
        mapTypeControl={false} // Disables the option to switch to satellite view
        streetViewControl={false} // Disables Street View control
        style={{ width: '80%', height: '65vh' }}
        onClick={() => setSelectedLocation(null)}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            label={{
              text: `${location.title} $`,
              color: 'black', // Set label color
              fontSize: '12px', // Set label font size
              fontWeight: 'bold', // Set label font weight
              className: styles.marker, // Add custom class to label
            }}
            onClick={() => setSelectedLocation(location)}
          />
        ))}

        {selectedLocation && (
          <InfoWindow
            position={{
              lat: selectedLocation.lat + 0.5,
              lng: selectedLocation.lng,
            }}
            headerDisabled
            onCloseClick={() => setSelectedLocation(null)}
          >
            <LocationToolTip onClick={setSelectedLocation} selectedLocation={selectedLocation} />
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

export default SimpleMap;
