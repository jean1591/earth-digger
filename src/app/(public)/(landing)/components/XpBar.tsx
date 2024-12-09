'use client'

import {
  pauseGame,
  setDisplayRewardCards,
} from '@/store/features/interactions/slice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { RootState } from '@/store/store'

export const XpBar = () => {
  const dispatch = useDispatch()
  const { depth, currentLevelXpBoundaries } = useSelector(
    (state: RootState) => state.dashboard
  )
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const totalXp = currentLevelXpBoundaries.high - currentLevelXpBoundaries.low
    const xpProgress = depth - currentLevelXpBoundaries.low
    const progressPercentage = (xpProgress / totalXp) * 100

    setProgress(progressPercentage)

    if (depth > currentLevelXpBoundaries.high) {
      dispatch(pauseGame())
      dispatch(setDisplayRewardCards(true))
    }
  }, [depth, currentLevelXpBoundaries])

  return (
    <div className="h-2 w-full bg-zinc-700">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
