'use client'

import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export const Stats = () => {
  const { watt } = useSelector((state: RootState) => state.dashboard)

  return (
    <div className="rounded-sm border border-white px-4 py-2">
      {watt.toFixed(0)} watts
    </div>
  )
}
