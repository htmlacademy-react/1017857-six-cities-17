import { createAction } from '@reduxjs/toolkit';

export const getPoints = createAction('getPoints');
export const selectLocation = createAction<{locationName: string}>('selectLocation');

