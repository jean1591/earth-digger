import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type HudValues = 'woodChopper'

interface DashboardSlice {
  hud: Record<HudValues, boolean>
  watt: number
  woodChopper: number
}

const initialState: DashboardSlice = {
  hud: {
    woodChopper: false,
  },
  watt: 0,
  woodChopper: 0,
}

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    addWoodChopper: (state, action: PayloadAction<number>) => {
      state.woodChopper += action.payload
    },
    incrementWatt: (state) => {
      state.watt += 1
    },
    incrementXWatt: (state, action: PayloadAction<number>) => {
      state.watt += action.payload
    },
    updateHud: (state, action: PayloadAction<HudValues>) => {
      state.hud = { ...state.hud, [action.payload]: true }
    },
  },
})

export const { addWoodChopper, incrementWatt, incrementXWatt, updateHud } =
  dashboardSlice.actions

export default dashboardSlice.reducer
