import { NameSpaces, Status } from '../../const.ts';
import { State } from '../../types/state.ts';

export const isPlacesDataPending = (state: State): boolean => state[NameSpaces.Place].status === Status.isPending;
export const getPlaces = (state: State) => state[NameSpaces.Place].places;
export const getCity = (state: State) => state[NameSpaces.Place].city;
export const getCityName = (state: State) => state[NameSpaces.Place].city.name;
