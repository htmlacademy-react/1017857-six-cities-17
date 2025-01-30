import { State } from '../../types/state.ts';
import { Review } from '../../types/review.ts';
import { NameSpace, Status } from '../../const.ts';

export const getReviewData = (state: State): Review[] => state[NameSpace.Review].reviewData;
export const isReviewPending = (state: State): boolean => state[NameSpace.Review].status === Status.Pending;
