import { NameSpaces } from '../../const.ts';
import { State } from '../../types/state.ts';
import { AuthorizationStatus } from '../../const.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpaces.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpaces.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getEmail = (state: State): string | undefined => state[NameSpaces.User].userData?.email;
