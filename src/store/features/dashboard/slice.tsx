import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { costNextFormula } from '@/utils/costNextFormula'

export const initialParams = {
  woodChopper: { costBase: 10, growthRate: 1.1 },
}

type HudValues = 'woodChoppers'

interface DashboardSlice {
  costs: { woodChopper: number }
  hud: Record<HudValues, boolean>
  watt: number
  woodChoppers: number
}

const initialState: DashboardSlice = {
  costs: { woodChopper: 10 },
  hud: {
    woodChoppers: false,
  },
  watt: 0,
  woodChoppers: 0,
}

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    addWoodChopper: (state, action: PayloadAction<number>) => {
      state.woodChoppers += action.payload

      state.watt -= state.costs.woodChopper
      state.costs.woodChopper = costNextFormula({
        costBase: initialParams.woodChopper.costBase,
        growthRate: initialParams.woodChopper.growthRate,
        quantityOwned: state.woodChoppers,
      })
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
