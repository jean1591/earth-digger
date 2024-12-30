import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { costNextFormula } from '@/utils/costNextFormula'

export const initialParams = {
  woodChopper: { costBase: 10, growthRate: 1.1 },
  scientist: { costBase: 100, growthRate: 1.05 },
}

type HudValues = 'scientists' | 'woodChoppers'

// Add generators attribute for woodChoppers and scientists
// Add resource attribute for watt and science
interface DashboardSlice {
  costs: { scientist: number; woodChopper: number }
  hud: Record<HudValues, boolean>
  science: number
  watt: number
  woodChoppers: number
  scientists: number
}

const initialState: DashboardSlice = {
  costs: {
    scientist: initialParams.scientist.costBase,
    woodChopper: initialParams.woodChopper.costBase,
  },
  hud: {
    scientists: false,
    woodChoppers: false,
  },
  science: 0,
  watt: 0,
  woodChoppers: 0,
  scientists: 0,
}

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    addScientist: (state, action: PayloadAction<number>) => {
      state.scientists += action.payload

      state.watt -= state.costs.scientist
      state.costs.scientist = costNextFormula({
        costBase: initialParams.scientist.costBase,
        growthRate: initialParams.scientist.growthRate,
        quantityOwned: state.scientists,
      })
    },
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
    incrementXScience: (state, action: PayloadAction<number>) => {
      state.science += action.payload
    },
    // Tick is played every 100ms (10 times per second)
    playTick: (state) => {
      state.watt += state.woodChoppers / 10
      state.science += state.scientists / 1000
    },
    updateHud: (state, action: PayloadAction<HudValues>) => {
      state.hud = { ...state.hud, [action.payload]: true }
    },
  },
})

export const {
  addScientist,
  addWoodChopper,
  incrementWatt,
  incrementXScience,
  incrementXWatt,
  playTick,
  updateHud,
} = dashboardSlice.actions

export default dashboardSlice.reducer
