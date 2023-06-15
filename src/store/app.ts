import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './types'

const initialState: AppState = { loading: false }

export const appSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setLoading: (state: any, action: any) => {
      state.loading = action.payload
    }
  }
})

export const { setLoading } = appSlice.actions

export default appSlice.reducer
