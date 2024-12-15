import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const ENERGY_CONSUMPTION_PER_SECOND = 20
const ENERGY_PRODUCTION_PER_SECOND = 30
const BASE_ENERGY_PRODUCTION = 80

export interface Inventory {
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
  stats: {
    diggingSpeed: number
    energyConsumption: number
    energyProduction: number
  }
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
  stats: {
    diggingSpeed: 0,
    energyConsumption: 0,
    energyProduction: BASE_ENERGY_PRODUCTION,
  },
}

// TODO: move methods to utils
const isEnergyConsumptionTooHigh = (
  energyConsumption: number,
  energyProduction: number
) => energyConsumption > energyProduction

const computeDiggingSpeed = ({
  diggers,
  diggingSpeedMultiplier,
  energyProduction,
}: {
  diggers: number
  diggingSpeedMultiplier: number
  energyProduction: number
}) => {
  const energyConsumption = diggers * ENERGY_CONSUMPTION_PER_SECOND
  // Throttle digger to 50% if consumption > production
  if (isEnergyConsumptionTooHigh(energyConsumption, energyProduction)) {
    return diggers * 0.5 * diggingSpeedMultiplier
  }

  return diggers * diggingSpeedMultiplier
}

const computeNextLevelFormula = (level: number) =>
  Math.floor((4 * level ** 3) / 5) * 10

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    addDigger: (state) => {
      const { robots, boosts } = state.inventory
      const updatedDiggersCount = robots.diggers + 1
      const updatedEnergyConsumption =
        updatedDiggersCount * ENERGY_CONSUMPTION_PER_SECOND

      state.inventory = {
        ...state.inventory,
        robots: {
          ...state.inventory.robots,
          diggers: updatedDiggersCount,
        },
      }

      state.stats.diggingSpeed = computeDiggingSpeed({
        diggers: updatedDiggersCount,
        diggingSpeedMultiplier: boosts.diggingSpeedMultiplier,
        energyProduction:
          robots.energy * ENERGY_PRODUCTION_PER_SECOND + BASE_ENERGY_PRODUCTION,
      })

      state.stats.energyConsumption = updatedEnergyConsumption
    },
    addEnergy: (state) => {
      const { robots, boosts } = state.inventory
      const updatedEnergyCount = robots.energy + 1
      const updatedEnergyProduction =
        updatedEnergyCount *
          ENERGY_PRODUCTION_PER_SECOND *
          boosts.energyProductionMultiplier +
        BASE_ENERGY_PRODUCTION

      state.inventory = {
        ...state.inventory,
        robots: {
          ...state.inventory.robots,
          energy: updatedEnergyCount,
        },
      }

      state.stats.energyProduction = updatedEnergyProduction

      state.stats.diggingSpeed = computeDiggingSpeed({
        diggers: robots.diggers,
        diggingSpeedMultiplier: boosts.diggingSpeedMultiplier,
        energyProduction: updatedEnergyProduction,
      })
    },
    // TODO: seems to have a problem with the energy production formula
    addBooster: (state) => {
      const { robots, boosts } = state.inventory
      const { boosters, diggers, energy } = robots
      const updatedBoostersCount = boosters + 1

      const { diggingSpeedMultiplier, energyProductionMultiplier } = boosts
      const updatedDiggingSpeedMultiplier = diggingSpeedMultiplier + 0.05
      const updatedEnergyProductionMultiplier =
        energyProductionMultiplier + 0.05

      const updatedEnergyProduction =
        (energy * ENERGY_PRODUCTION_PER_SECOND + BASE_ENERGY_PRODUCTION) *
        updatedEnergyProductionMultiplier

      state.inventory = {
        ...state.inventory,
        boosts: {
          ...state.inventory.boosts,
          diggingSpeedMultiplier: updatedDiggingSpeedMultiplier,
          energyProductionMultiplier: updatedEnergyProductionMultiplier,
        },
        robots: {
          ...state.inventory.robots,
          boosters: updatedBoostersCount,
        },
      }

      state.stats.diggingSpeed = computeDiggingSpeed({
        diggers: diggers,
        diggingSpeedMultiplier: updatedDiggingSpeedMultiplier,
        energyProduction: updatedEnergyProduction,
      })

      state.stats.energyProduction = updatedEnergyProduction
    },
    incrementDepth: (state) => {
      state.depth += 1
    },
    incrementXDepth: (state, action: PayloadAction<number>) => {
      state.depth += action.payload
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

export const {
  addBooster,
  addDigger,
  addEnergy,
  incrementDepth,
  incrementXDepth,
  levelUp,
} = dashboardSlice.actions

export default dashboardSlice.reducer
