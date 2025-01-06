export const Setting = {
  PlaceCardCount: 6
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export const DEFAULT_SORT = 'pop';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const MarkerUrl = {
  DEFAULT: './img/pin.svg',
  CURRENT: './img/pin-active.svg'
};

export enum SortType {
  Popular = 'pop',
  PriceLowToHigh = 'lth',
  PriceHighToLow = 'htl',
  TopRatedFirst = 'rat'
}

export const placeOptions = [
  {
    key: SortType.Popular,
    label: 'Popular'
  },
  {
    key: SortType.PriceLowToHigh,
    label: 'Price: low to high'
  },
  {
    key: SortType.PriceHighToLow,
    label: 'Price: high to low'
  },
  {
    key: SortType.TopRatedFirst,
    label: 'Top rated first'
  }
];
