import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from './features/dashboard/slice'
import interactionsReducer from './features/interactions/slice'

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    interactions: interactionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
