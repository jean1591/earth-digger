'use client'

import { incrementDepth } from '@/store/features/dashboard/slice'
import { resumeGame } from '@/store/features/interactions/slice'
import { useDispatch } from 'react-redux'

export const DigButton = () => {
  const dispatch = useDispatch()

  const handleOnClick = () => {
    dispatch(incrementDepth())
    dispatch(resumeGame())
  }

  return (
    <button
      onClick={handleOnClick}
      className="rounded-lg border border-gray-300 px-4 py-2 text-lg font-semibold shadow-md transition-shadow duration-300 ease-in-out hover:border-gray-200 hover:shadow-none"
    >
      ⛏️ Dig !
    </button>
  )
}
