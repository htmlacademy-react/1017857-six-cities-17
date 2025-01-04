export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type OfferExtended = Omit<Offer, 'previewImage'> & {
  description: string;
  images: string[];
  goods: string[];
  host: Host;
  bedrooms: number;
  maxAdults: number;
  reviews: string[] | null;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom?: number;
}

export type City = {
  name: string;
  location: Location;
}

export type Host = {
  isPro: boolean;
  name: string;
  avatarUrl: string;
}
