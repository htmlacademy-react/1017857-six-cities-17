import cn from 'classnames';
import React from 'react';

type LocationProps = {
  name: string;
  isActive: boolean;
  onClick: (text: string) => void;
}

function Location({ name, isActive, onClick }: LocationProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const cityName: string = e.currentTarget.innerText;
    if (cityName) {
      onClick(cityName);
    }
  };

  return (
    <li className="locations__item">
      <a className={cn(
        'locations__item-link tabs__item',
        { 'tabs__item--active': isActive }
      )}
      href="#"
      onClick={handleClick}
      >
        <span>{name}</span>
      </a>
    </li>
  );
}

export default Location;
