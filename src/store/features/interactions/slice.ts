import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type GameState = 'play' | 'pause'

export interface InteractionsSlice {
  state: GameState
}

const initialState: InteractionsSlice = {
  state: 'pause',
}

export const interactionsSlice = createSlice({
  name: 'interactionsSlice',
  initialState,
  reducers: {
    pauseGame: (state) => {
      state.state = 'pause'
    },
    resumeGame: (state) => {
      state.state = 'play'
    },
  },
})

export const { pauseGame, resumeGame } = interactionsSlice.actions

export default interactionsSlice.reducer
