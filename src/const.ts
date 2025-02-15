import { City } from './types/offer.ts';

export const Setting = {
  PlaceCardCount: 20,
  NeighbourhoodCount: 3,
  MaxReviews: 10
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

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

export const cities: City[] = [
  {
    'name': 'Paris',
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13
    }
  },
  {
    'name': 'Cologne',
    'location': {
      'latitude': 50.938361,
      'longitude': 6.959974,
      'zoom': 13
    }
  },
  {
    'name': 'Brussels',
    'location': {
      'latitude': 50.846557,
      'longitude': 4.351697,
      'zoom': 13
    }
  },
  {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.37454,
      'longitude': 4.897976,
      'zoom': 13
    }
  },
  {
    'name': 'Hamburg',
    'location': {
      'latitude': 53.550341,
      'longitude': 10.000654,
      'zoom': 13
    }
  },
  {
    'name': 'Dusseldorf',
    'location': {
      'latitude': 51.225402,
      'longitude': 6.776314,
      'zoom': 13
    }
  },
];

export const DEFAULT_CITY = 'Paris';

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorites = '/favorite'
}

export enum NameSpace {
  Offer = 'OFFER',
  Place = 'PLACE',
  User = 'USER',
  Favorite = 'FAVORITE',
  Review = 'REVIEW'
}

export enum Status {
  Success = 'SUCCESS',
  Error = 'ERROR',
  Pending = 'PENDING',
  Idle = 'IDLE'
}
