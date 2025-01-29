import leaflet, {Icon, LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap.ts';
import { MarkerUrl } from '../../const.ts';
import { Location, Offer } from '../../types/offer.ts';
import cn from 'classnames';

type MapProps = {
  city: Location;
  points: Offer[];
  selectedPointId: string | null;
  variant: 'cities' | 'offer';
};

const defaultCustomIcon = new Icon({
  iconUrl: MarkerUrl.DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: MarkerUrl.CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map(props: MapProps) {
  const { city, points, selectedPointId, variant } = props;
  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  const markersLayer = useRef<LayerGroup | null>(null);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (markersLayer.current) {
      markersLayer.current.clearLayers();
    } else {
      markersLayer.current = leaflet.layerGroup();
    }

    if (markersLayer.current && !map.hasLayer(markersLayer.current)) {
      markersLayer.current.addTo(map);
    }

    points.forEach((point) => {
      const marker = leaflet.marker(
        {
          lat: point.location.latitude,
          lng: point.location.longitude,
        },
        {
          icon: point.id === selectedPointId ? currentCustomIcon : defaultCustomIcon,
        }
      );

      marker.addTo(markersLayer.current!);
    });
  }, [map, points, selectedPointId]);

  return (
    <section
      style={{
        height: variant === 'offer' ? '580px' : 'auto'
      }}
      className = {cn(
        { 'cities__map': variant === 'cities' },
        { 'offer__map': variant === 'offer' },
        'map'
      )}
      ref={mapRef}
    />
  );
}

export default Map;
