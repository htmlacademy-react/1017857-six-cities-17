import LocationLink from '../location-link/location-link.tsx';

type LocationProps = {
  name: string;
  isActive: boolean;
  variant: 'tab' | 'favorite' | 'login';
}

function LocationItem({ name, isActive, variant }: LocationProps) {

  return (
    variant === 'login' ? (
      <div className="locations__item">
        <LocationLink name={name} variant={variant}/>
      </div>) : (
      <li className="locations__item">
        <LocationLink isActive={isActive} name={name} variant={variant}/>
      </li>)
  );
}

export default LocationItem;
