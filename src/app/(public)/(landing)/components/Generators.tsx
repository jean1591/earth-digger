'use client'

import {
  addWoodChopper,
  incrementXWatt,
  updateHud,
} from '@/store/features/dashboard/slice'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store/store'
import { useEffect } from 'react'

export const Generators = () => {
  const dispatch = useDispatch()

  const { costs, hud, watt, woodChoppers } = useSelector(
    (state: RootState) => state.dashboard
  )
  const { state } = useSelector((state: RootState) => state.interactions)

  const handleAddWoodChopper = () => {
    dispatch(addWoodChopper(1))
  }

  useEffect(() => {
    if (watt > 9) {
      dispatch(updateHud('woodChoppers'))
    }
  }, [watt])

  useEffect(() => {
    if (state === 'play') {
      const interval = setInterval(() => {
        dispatch(incrementXWatt(woodChoppers / 10))
      }, 100)

      return () => clearInterval(interval)
    }
  }, [woodChoppers, state])

  if (!hud.woodChoppers) {
    return <></>
  }

  return (
    <div className="mb-4">
      {hud.woodChoppers ? (
        <button
          disabled={costs.woodChopper > watt}
          onClick={handleAddWoodChopper}
          className="min-w-24 rounded-sm border border-white px-4 py-2 text-left transition-colors duration-300 ease-in-out hover:bg-zinc-800 disabled:border-zinc-700 disabled:text-zinc-700"
        >
          <p>🪓 Hire wood chopper</p>
          <p className="text-sm">Costs: {costs.woodChopper.toFixed(0)} watts</p>
        </button>
      ) : null}
    </div>
  )
}
