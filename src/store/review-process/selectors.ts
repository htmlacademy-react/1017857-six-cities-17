import { State } from '../../types/state.ts';
import { Review } from '../../types/review.ts';
import { NameSpaces, Status } from '../../const.ts';

export const getReviewData = (state: State): Review[] => state[NameSpaces.Review].reviewData;
export const isReviewPending = (state: State): boolean => state[NameSpaces.Review].status === Status.Pending;
