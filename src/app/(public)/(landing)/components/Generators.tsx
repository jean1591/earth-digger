'use client'

import {
  incrementXScience,
  incrementXWatt,
  updateHud,
} from '@/store/features/dashboard/slice'
import { useDispatch, useSelector } from 'react-redux'

import { HireScientistButton } from './generators/HireScientistButton'
import { HireWoodChopperButton } from './generators/HireWoodChopperButton'
import { RootState } from '@/store/store'
import { useEffect } from 'react'

export const Generators = () => {
  const dispatch = useDispatch()

  const { costs, hud, scientists, watt, woodChoppers } = useSelector(
    (state: RootState) => state.dashboard
  )
  const { state } = useSelector((state: RootState) => state.interactions)

  const { scientists: scientistsHud, woodChoppers: woodChoppersHud } = hud

  useEffect(() => {
    if (watt > 9) {
      dispatch(updateHud('woodChoppers'))
    }
  }, [watt])

  useEffect(() => {
    if (watt > 100) {
      dispatch(updateHud('scientists'))
    }
  }, [watt])

  // TODO: move increment logic to slice
  useEffect(() => {
    if (state === 'play') {
      const interval = setInterval(() => {
        dispatch(incrementXWatt(woodChoppers / 10))
        dispatch(incrementXScience(scientists / 1000))
      }, 100)

      return () => clearInterval(interval)
    }
  }, [woodChoppers, state])

  if (!woodChoppersHud) {
    return <></>
  }

  return (
    <div className="mb-4 space-y-4">
      {woodChoppersHud ? (
        <div>
          <HireWoodChopperButton
            costs={costs.woodChopper.toFixed(0)}
            disabled={costs.woodChopper > watt}
          />
        </div>
      ) : null}
      {scientistsHud ? (
        <div>
          <HireScientistButton
            costs={costs.scientist.toFixed(0)}
            disabled={costs.scientist > watt}
          />
        </div>
      ) : null}
    </div>
  )
}
