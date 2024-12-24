'use client'

import { incrementXWatt, updateHud } from '@/store/features/dashboard/slice'
import { useDispatch, useSelector } from 'react-redux'

import { HireWoodChopperButton } from './generators/HireWoodChopperButton'
import { RootState } from '@/store/store'
import { useEffect } from 'react'

export const Generators = () => {
  const dispatch = useDispatch()

  const { costs, hud, watt, woodChoppers } = useSelector(
    (state: RootState) => state.dashboard
  )
  const { state } = useSelector((state: RootState) => state.interactions)

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
        <HireWoodChopperButton
          costs={costs.woodChopper.toFixed(0)}
          disabled={costs.woodChopper > watt}
        />
      ) : null}
    </div>
  )
}
