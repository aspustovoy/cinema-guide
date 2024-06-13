import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { Genre } from '../models/Genres';

interface GenreState {
  data: Genre;
}

const initialState: GenreState = {
  data: null,
};

export const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<Genre>) => {
      state.data = action.payload;
    },
  },
});

export const { setGenre } = genreSlice.actions;

export const selectGenre = (state: RootState) => state.genre.data;

export default genreSlice.reducer;
