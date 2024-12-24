'use client'

import { addWoodChopper, updateHud } from '@/store/features/dashboard/slice'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store/store'
import { useEffect } from 'react'

export const Generators = () => {
  const dispatch = useDispatch()

  const { hud, watt } = useSelector((state: RootState) => state.dashboard)

  const handleAddWoodChopper = () => {
    dispatch(addWoodChopper(1))
  }

  useEffect(() => {
    if (watt > 9) {
      dispatch(updateHud('woodChopper'))
    }
  }, [watt])

  return (
    <div>
      {hud.woodChopper ? (
        <button
          onClick={handleAddWoodChopper}
          className="rounded-sm border border-white px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-zinc-800"
        >
          🪓 Hire wood chopper
        </button>
      ) : null}
    </div>
  )
}
