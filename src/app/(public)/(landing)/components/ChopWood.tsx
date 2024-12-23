'use client'

import { incrementWatt } from '@/store/features/dashboard/slice'
import { resumeGame } from '@/store/features/interactions/slice'
import { useDispatch } from 'react-redux'

export const ChopWood = () => {
  const dispatch = useDispatch()

  const handleOnClick = () => {
    dispatch(incrementWatt())
    dispatch(resumeGame())
  }

  return (
    <button
      onClick={handleOnClick}
      className="rounded-sm border-2 border-white px-4 py-2 text-lg font-semibold transition-colors duration-300 ease-in-out hover:bg-zinc-800"
    >
      🪵 Chop Wood !
    </button>
  )
}
