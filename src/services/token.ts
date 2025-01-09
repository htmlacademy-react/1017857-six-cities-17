const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export type Token = string;

export const getToken = (): Token => {
  // const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  const token = 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=';
  return token ?? '';
};

export const setToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const clearToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
