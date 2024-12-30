'use client'

import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export const Stats = () => {
  const { hud, science, scientists, watt, woodChoppers } = useSelector(
    (state: RootState) => state.dashboard
  )
  const { scientists: scientistsHud, woodChoppers: woodChoppersHud } = hud

  return (
    <div className="rounded-sm border border-white px-4 py-2">
      <div className="flex items-center justify-between">
        <p>Watts {watt.toFixed(0)}</p>
        {woodChoppers ? (
          <p className="text-right text-zinc-500">+ {woodChoppers}/s</p>
        ) : null}
      </div>

      {scientistsHud ? (
        <div className="flex items-center justify-between">
          <p>Science {science.toFixed(0)}</p>
          <p className="text-right text-zinc-500">+ {scientists / 1000}/s</p>
        </div>
      ) : null}

      {woodChoppers ? <hr className="my-8 border-t border-white" /> : null}

      {woodChoppersHud ? <p>Wood choppers {woodChoppers.toFixed(0)}</p> : null}
      {scientistsHud ? <p>Scientists {scientists.toFixed(0)}</p> : null}
    </div>
  )
}
