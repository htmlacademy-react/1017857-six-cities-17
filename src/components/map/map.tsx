import leaflet, { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap.ts';
import { Marker } from '../../const.ts';
import { City, Offer } from '../../types/offer.ts';

type MapProps = {
  city: City;
  points: Offer[];
  selectedPointId: string | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: Marker.DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: Marker.CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map(props: MapProps) {
  const { city, points, selectedPointId } = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (point.id !== null && point.id === selectedPointId)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, selectedPointId]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    />
  );
}

export default Map;
