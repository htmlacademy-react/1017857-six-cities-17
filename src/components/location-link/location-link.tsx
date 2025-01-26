import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../hooks';
import { selectLocation } from '../../store/places-process/places-process.ts';
import React from 'react';

type LocationLinkProps = {
  isActive?: boolean;
  isLogin?: boolean;
  name: string;
}

function LocationLink({ isActive, name, isLogin }: LocationLinkProps) {
  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLogin) {
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
      { 'tabs__item': !isLogin },
      { 'tabs__item--active': isActive },
      { 'locations__item-link': isLogin }
    )}
    to={AppRoute.Main}
    onClick={handleClick}
    >
      <span>{name}</span>
    </Link>
  );
}

export default LocationLink;
