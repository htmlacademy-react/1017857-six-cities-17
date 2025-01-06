import cn from 'classnames';
import { useState } from 'react';
import { placeOptions, SortType } from '../../const.ts';

type PlaceOptionProps = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

type PlacesSortProps = {
  currentOption: SortType;
  onOptionChange: (option: string) => void;
};

function PlaceOption({ text, isActive, onClick }: PlaceOptionProps) {
  return (
    <li className={cn(
      'places__option',
      { 'places__option--active': isActive }
    )}
    tabIndex={0}
    onClick={onClick}
    >
      {text}
    </li>
  );
}

function PlacesSort({ currentOption, onOptionChange }: PlacesSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (key: string) => {
    onOptionChange(key);
    setIsOpen(false);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen(!isOpen)}>
        {placeOptions.find((option) => option.key === currentOption)?.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn(
        'places__options places__options--custom',
        { 'places__options--opened': isOpen }
      )}
      >
        {placeOptions.map((option) => (
          <PlaceOption
            key={option.key}
            text={option.label}
            isActive={option.key === currentOption}
            onClick={() => handleOptionClick(option.key)}
          />
        ))}
      </ul>
    </form>
  );
}

export default PlacesSort;
