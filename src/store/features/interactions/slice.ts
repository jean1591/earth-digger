import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type GameState = 'play' | 'pause'

export interface InteractionsSlice {
  displayRewardCards: boolean
  state: GameState
}

const initialState: InteractionsSlice = {
  displayRewardCards: false,
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
    setDisplayRewardCards: (state, action: PayloadAction<boolean>) => {
      state.displayRewardCards = action.payload
    },
  },
})

export const { pauseGame, resumeGame, setDisplayRewardCards } =
  interactionsSlice.actions

export default interactionsSlice.reducer
