import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface modalAuthState {
  modalIsOpen: boolean;
}

const initialState: modalAuthState = {
  modalIsOpen: false,
};

export const modalAuthSlice = createSlice({
  name: 'modalAuth',
  initialState,
  reducers: {
    setIsOpenAuth: (state, action: PayloadAction<boolean>) => {
      state.modalIsOpen = action.payload;
    },
  },
});

export const { setIsOpenAuth } = modalAuthSlice.actions;

export const selectModalIsOpen = (state: RootState) => state.modalAuth.modalIsOpen;

export default modalAuthSlice.reducer;
