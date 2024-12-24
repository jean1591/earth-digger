'use client'

import {
  resumeGame,
  setDisplayOnbardingModal,
} from '@/store/features/interactions/slice'

import { incrementWatt } from '@/store/features/dashboard/slice'
import { useDispatch } from 'react-redux'

export const ChopWood = () => {
  const dispatch = useDispatch()

  const handleOnClick = () => {
    dispatch(incrementWatt())
    dispatch(resumeGame())
    dispatch(setDisplayOnbardingModal(false))
  }

  return (
    <button
      onClick={handleOnClick}
      className="rounded-sm border border-white px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-zinc-800"
    >
      🪵 Chop Wood !
    </button>
  )
}
