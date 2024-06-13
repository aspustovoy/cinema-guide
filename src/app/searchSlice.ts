import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface searchState {
  searchIsOpen: boolean;
}

const initialState: searchState = {
  searchIsOpen: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setIsOpenSearch: (state, action: PayloadAction<boolean>) => {
      state.searchIsOpen = action.payload;
    },
  },
});

export const { setIsOpenSearch } = searchSlice.actions;

export const selectSearchIsOpen = (state: RootState) => state.search.searchIsOpen;

export default searchSlice.reducer;
