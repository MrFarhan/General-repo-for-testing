import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    saveUserDetails: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state, action) => {
      state.user = null
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUserDetails, clearUser } = userSlice.actions;

export default userSlice.reducer;
