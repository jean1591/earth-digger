import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type GameState = 'play' | 'pause'

export interface InteractionsSlice {
  displayOnbardingModal: boolean
  displayRewardCards: boolean
  state: GameState
}

const initialState: InteractionsSlice = {
  displayOnbardingModal: false,
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
    setDisplayOnbardingModal: (state, action: PayloadAction<boolean>) => {
      state.displayOnbardingModal = action.payload
    },
  },
})

export const { pauseGame, resumeGame, setDisplayOnbardingModal } =
  interactionsSlice.actions

export default interactionsSlice.reducer
