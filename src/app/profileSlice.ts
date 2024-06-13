import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Profile } from '../models';

interface ProfileState {
  data: Profile;
}

const initialState: ProfileState = {
  data: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.data;

export default profileSlice.reducer;
