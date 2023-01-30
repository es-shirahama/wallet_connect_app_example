import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export enum Page {
  COLLECTIONS = 'collections',
  ATLIER = 'atelier',
}

export interface PageState {
  page: Page | string;
}

const initialState: PageState = {
  page: Page.COLLECTIONS,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    move: (state, action: PayloadAction<PageState['page']>) => {
      state.page = action.payload;
    },
  },
});

export const { move } = pageSlice.actions;

export const selectPage = (state: RootState) => state.page;

export default pageSlice.reducer;
