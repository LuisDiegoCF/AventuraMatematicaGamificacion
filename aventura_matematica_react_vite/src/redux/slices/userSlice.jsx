import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: ''
  },
  reducers: {
    userLogin: (state, action) => {
      state.username = action.payload;
    },
    userLogout: (state) => {
      // clearToken();
      state.username = null;
    }
  },
})

export const { userLogin, userLogout } = userSlice.actions

export default userSlice.reducer