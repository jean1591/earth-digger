'use client'

import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export const Stats = () => {
  const { watt, woodChoppers } = useSelector(
    (state: RootState) => state.dashboard
  )

  return (
    <div className="rounded-sm border border-white px-4 py-2">
      <div className="flex items-center justify-between">
        <p>Watts {watt.toFixed(0)}</p>
        {woodChoppers ? (
          <p className="text-right text-zinc-500">+ {woodChoppers}/s</p>
        ) : null}
      </div>
    </div>
  )
}
