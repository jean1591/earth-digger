'use client'

import {
  incrementDepth,
  incrementXDepth,
} from '@/store/features/dashboard/slice'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store/store'
import { resumeGame } from '@/store/features/interactions/slice'
import { useEffect } from 'react'

export const DigButton = () => {
  const dispatch = useDispatch()
  const {
    inventory: {
      robots: { diggers },
      boosts: { diggingSpeedMultiplier },
    },
  } = useSelector((state: RootState) => state.dashboard)
  const { state } = useSelector((state: RootState) => state.interactions)

  useEffect(() => {
    if (state === 'play') {
      const interval = setInterval(() => {
        dispatch(
          incrementXDepth(
            Math.round(diggers * diggingSpeedMultiplier * 10) / 10
          )
        )
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [diggers, state])

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
