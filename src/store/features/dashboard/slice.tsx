import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const ENERGY_CONSUMPTION_PER_SECOND = 20
export const ENERGY_PRODUCTION_PER_SECOND = 30
const BASE_ENERGY_PRODUCTION = 30
const BOOST_VALUE = 0.1

export interface Stats {
  diggingSpeed: number
  energyConsumption: number
  energyProduction: number
}

export type Hud = {
  stats: {
    diggingSpeed: boolean
    energyConsumption: boolean
    energyProduction: boolean
  }
  inventory: { boosts: boolean; robots: boolean }
}

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
  stats: Stats
  hud: Hud
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
  hud: {
    stats: {
      diggingSpeed: false,
      energyConsumption: false,
      energyProduction: false,
    },
    inventory: { boosts: false, robots: false },
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
        (updatedEnergyCount * ENERGY_PRODUCTION_PER_SECOND +
          BASE_ENERGY_PRODUCTION) *
        boosts.energyProductionMultiplier

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
    addBooster: (state) => {
      const { robots, boosts } = state.inventory
      const { boosters, diggers, energy } = robots
      const updatedBoostersCount = boosters + 1

      const { diggingSpeedMultiplier, energyProductionMultiplier } = boosts
      const updatedDiggingSpeedMultiplier = diggingSpeedMultiplier + BOOST_VALUE
      const updatedEnergyProductionMultiplier =
        energyProductionMultiplier + BOOST_VALUE

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
    upgradeDigger: (state) => {
      const { robots, boosts } = state.inventory
      const { diggers, energy } = robots

      const { diggingSpeedMultiplier, energyProductionMultiplier } = boosts
      const updatedDiggingSpeedMultiplier = diggingSpeedMultiplier + BOOST_VALUE

      const updatedEnergyProduction =
        (energy * ENERGY_PRODUCTION_PER_SECOND + BASE_ENERGY_PRODUCTION) *
        energyProductionMultiplier

      state.inventory = {
        ...state.inventory,
        boosts: {
          ...state.inventory.boosts,
          diggingSpeedMultiplier: updatedDiggingSpeedMultiplier,
        },
      }

      state.stats.diggingSpeed = computeDiggingSpeed({
        diggers: diggers,
        diggingSpeedMultiplier: updatedDiggingSpeedMultiplier,
        energyProduction: updatedEnergyProduction,
      })
    },
    upgradeEnergy: (state) => {
      const {
        robots: { energy },
        boosts,
      } = state.inventory

      const { energyProductionMultiplier } = boosts
      const updatedEnergyProductionMultiplier =
        energyProductionMultiplier + BOOST_VALUE

      const updatedEnergyProduction =
        (energy * ENERGY_PRODUCTION_PER_SECOND + BASE_ENERGY_PRODUCTION) *
        updatedEnergyProductionMultiplier

      state.inventory = {
        ...state.inventory,
        boosts: {
          ...state.inventory.boosts,
          energyProductionMultiplier: updatedEnergyProductionMultiplier,
        },
      }

      state.stats.energyProduction = updatedEnergyProduction
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
  upgradeDigger,
  upgradeEnergy,
} = dashboardSlice.actions

export default dashboardSlice.reducer
