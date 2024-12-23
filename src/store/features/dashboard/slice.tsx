import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface DashboardSlice {
  watt: number
}

const initialState: DashboardSlice = {
  watt: 0,
}

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    incrementWatt: (state) => {
      state.watt += 1
    },
    incrementXWatt: (state, action: PayloadAction<number>) => {
      state.watt += action.payload
    },
  },
})

export const { incrementWatt, incrementXWatt } = dashboardSlice.actions

export default dashboardSlice.reducer
