import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hooks';
import { selectLocation } from '../../store/places-process/places-process.ts';
import React from 'react';

type LocationLinkProps = {
  isActive?: boolean;
  name: string;
  variant: 'tab' | 'favorite' | 'login';
}

function LocationLink({ isActive, name, variant }: LocationLinkProps) {
  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (variant === 'tab') {
      e.preventDefault();
    }
    const cityName: string = String(e.currentTarget.innerText);
    if (cityName) {
      dispatch(selectLocation({ locationName: cityName }));
    }
  };
  return (
    <Link className={cn(
      'locations__item-link',
      { 'tabs__item': variant === 'tab' },
      { 'tabs__item--active': variant === 'tab' && isActive },
    )}
    to={AppRoute.Main}
    onClick={handleClick}
    >
      <span>{name}</span>
    </Link>
  );
}

export default LocationLink;
