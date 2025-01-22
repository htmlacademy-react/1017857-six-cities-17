export type Review = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type User = {
  name: string;
  avatarUrl: string;
  isPro?: boolean;
}

export type ReviewData = {
  offerId: string;
  comment: string;
  rating: number;
}
