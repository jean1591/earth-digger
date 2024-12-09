import { createSlice } from '@reduxjs/toolkit'

interface Inventory {
  robots: { manual: 1; diggers: number; energy: number; boosters: number }
  boosts: {
    diggingSpeedMultiplier: number
    energyProductionMultiplier: number
    xpMultiplier: number
  }
}

export interface DashboardSlice {
  currentLevelXpBoundaries: { low: number; high: number }
  depth: number | 0
  level: number | 0
  inventory: Inventory
}

const initialState: DashboardSlice = {
  currentLevelXpBoundaries: { low: 0, high: 10 }, // Change to 60
  depth: 0,
  level: 0,
  inventory: {
    robots: { manual: 1, diggers: 0, energy: 0, boosters: 0 },
    boosts: {
      diggingSpeedMultiplier: 1,
      energyProductionMultiplier: 1,
      xpMultiplier: 1,
    },
  },
}

const computeNextLevelFormula = (level: number) =>
  Math.floor((4 * level ** 3) / 5) * 10

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    addDigger: (state) => {
      state.inventory = {
        ...state.inventory,
        robots: {
          ...state.inventory.robots,
          diggers: state.inventory.robots.diggers + 1,
        },
      }
    },
    addEnergy: (state) => {
      state.inventory = {
        ...state.inventory,
        robots: {
          ...state.inventory.robots,
          energy: state.inventory.robots.energy + 1,
        },
      }
    },
    addBooster: (state) => {
      state.inventory = {
        ...state.inventory,
        boosts: {
          ...state.inventory.boosts,
          diggingSpeedMultiplier:
            state.inventory.boosts.diggingSpeedMultiplier + 0.05,
          energyProductionMultiplier:
            state.inventory.boosts.energyProductionMultiplier + 0.05,
        },
      }
    },
    incrementDepth: (state) => {
      state.depth += 1
    },
    levelUp: (state) => {
      state.level += 1
      state.currentLevelXpBoundaries = {
        low: state.currentLevelXpBoundaries.high,
        high: computeNextLevelFormula(state.level + 1),
      }
    },
  },
})

export const { addBooster, addDigger, addEnergy, incrementDepth, levelUp } =
  dashboardSlice.actions

export default dashboardSlice.reducer
