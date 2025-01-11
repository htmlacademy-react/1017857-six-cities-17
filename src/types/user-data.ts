export type UserData = {
  email: string;
  token: string;
  avatarUrl: string;
  isPro: boolean;
};

export type User = Omit<UserData, 'token'>
