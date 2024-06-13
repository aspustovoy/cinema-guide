import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { Movie } from '../models';

interface MovieState {
  data: Movie;
}

const initialState: MovieState = {
  data: null,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<Movie>) => {
      state.data = action.payload;
    },
  },
});

export const { setMovie } = movieSlice.actions;

export const selectMovie = (state: RootState) => state.movie.data;

export default movieSlice.reducer;
