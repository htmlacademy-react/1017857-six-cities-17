import { City } from '../../types/offer.ts';
import Location from '../loction/location.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCityName } from '../../store/places-process/selectors.ts';
import { selectLocation } from '../../store/places-process/places-process.ts';

type LocationsProps = {
  locations: City[];
};

function Locations({ locations }: LocationsProps) {
  const dispatch = useAppDispatch();
  const active = useAppSelector(getCityName);
  const handleClick = (locationName: string) => {
    dispatch(selectLocation({ locationName }));
  };
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((item) => <Location name={item.name} key={item.name} isActive={item.name === active} onClick={() => handleClick(item.name)} />)}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
