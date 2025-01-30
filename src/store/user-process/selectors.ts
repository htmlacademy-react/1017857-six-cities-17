import { NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';
import { AuthorizationStatus } from '../../const.ts';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getEmail = (state: State): string | undefined => state[NameSpace.User].userData?.email;
