'use client'

import { RootState } from '@/store/store'
import { StatCard } from './StatCard'
import { useSelector } from 'react-redux'

export const Stats = () => {
  const { depth } = useSelector((state: RootState) => state.dashboard)

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard value={depth} unit="m" label="Depth" />
      <StatCard value={3} unit="m/s" label="Digging speed" />
      <StatCard value={200} unit="⚡️/s" label="Energy consumption" />
      <StatCard value={220} unit="⚡️/s" label="Energy production" />
    </div>
  )
}
