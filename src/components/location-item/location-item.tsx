import LocationLink from '../location-link/location-link.tsx';

type LocationProps = {
  name: string;
  isActive: boolean;
  isLogin?: boolean;
}

function LocationItem({ name, isActive, isLogin }: LocationProps) {

  return (
    isLogin ? (
      <div className="locations__item">
        <LocationLink name={name} isLogin/>
      </div>) : (
      <li className="locations__item">
        <LocationLink isActive={isActive} name={name}/>
      </li>)
  );
}

export default LocationItem;
