import {
  Map,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

import { PoiMarkers } from './PoiMarker';

export default function Geocoding({ query }) {
  const placesLib = useMapsLibrary('places');
  const map = useMap();
  const [location, setLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (!placesLib || !map || !query) return;

    const service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(
      {
        query,
        fields: ['name', 'geometry', 'formatted_address'],
      },
      (results, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          results &&
          results[0]
        ) {
          const loc = results[0].geometry?.location;
          if (loc) {
            const latLng = { lat: loc.lat(), lng: loc.lng() };
            setLocation(latLng);
            map.setCenter(latLng);
            map.setZoom(15);
          }
        }
      }
    );
  }, [placesLib, map, query]);

  return (
    <>
      <Map
        mapId="EATWEB_ID"
        defaultZoom={12}
        defaultCenter={{ lat: 51.12, lng: 71.43 }}
        style={{ height: '500px', width: '100%' }}
      >
        {location && (
          <PoiMarkers
            poi={{
              key: query,
              location: location,
            }}
          />
        )}
      </Map>
    </>
  );
}
