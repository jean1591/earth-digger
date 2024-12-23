import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface DashboardSlice {
  depth: number
}

const initialState: DashboardSlice = {
  depth: 0,
}

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    incrementDepth: (state) => {
      state.depth += 1
    },
    incrementXDepth: (state, action: PayloadAction<number>) => {
      state.depth += action.payload
    },
  },
})

export const { incrementDepth, incrementXDepth } = dashboardSlice.actions

export default dashboardSlice.reducer
