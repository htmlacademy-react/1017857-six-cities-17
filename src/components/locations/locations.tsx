import { City } from '../../types/offer.ts';
import LocationItem from '../location-item/location-item.tsx';
import { useAppSelector } from '../../hooks';
import { getCityName } from '../../store/places-process/selectors.ts';

type LocationsProps = {
  locations: City[];
};

function Locations({ locations }: LocationsProps) {
  const active = useAppSelector(getCityName);
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((item) => <LocationItem name={item.name} key={item.name} isActive={item.name === active}/>)}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
