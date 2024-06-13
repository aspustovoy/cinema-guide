import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import genreReducer from './genreSlice';
import profileReducer from './profileSlice';
import modalAuthReducer from './modalAuthSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    modalAuth: modalAuthReducer,
    movie: movieReducer,
    genre: genreReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
