import { createSlice } from '@reduxjs/toolkit'
import { UserState } from './types';

const initialState: UserState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    companyType: '',
    state: ''
  }
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserData: (state: any, action: any) => {
      state.user = action.payload
    }
  }
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer
