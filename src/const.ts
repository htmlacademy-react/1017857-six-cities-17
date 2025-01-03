export const Setting = {
  PlaceCardCount: 6
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

export const Marker = {
  DEFAULT: './img/pin.svg',
  CURRENT: './img/pin-active.svg'
};
