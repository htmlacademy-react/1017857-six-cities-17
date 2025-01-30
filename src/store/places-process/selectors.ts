import { NameSpace, Status } from '../../const.ts';
import { State } from '../../types/state.ts';

export const isPlacesDataPending = (state: State): boolean => state[NameSpace.Place].status === Status.Pending;
export const getPlaces = (state: State) => state[NameSpace.Place].places;
export const getCity = (state: State) => state[NameSpace.Place].city;
export const getCityName = (state: State) => state[NameSpace.Place].city.name;
