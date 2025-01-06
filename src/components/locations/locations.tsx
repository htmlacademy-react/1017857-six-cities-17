import { City } from '../../types/offer.ts';
import Location from '../loction/location.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectLocation } from '../../store/action.ts';

type LocationsProps = {
  locations: City[];
};

function Locations({ locations }: LocationsProps) {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.city.name);
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
