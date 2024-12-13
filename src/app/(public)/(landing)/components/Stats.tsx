'use client'

import { RootState } from '@/store/store'
import { StatCard } from './StatCard'
import { useSelector } from 'react-redux'

export const Stats = () => {
  const { depth, stats } = useSelector((state: RootState) => state.dashboard)
  const { diggingSpeed, energyConsumption, energyProduction } = stats

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard value={depth.toFixed(2)} unit="m" label="Depth" />
      <StatCard
        value={diggingSpeed.toFixed(2)}
        unit="m/s"
        label="Digging speed"
      />
      <StatCard
        value={energyConsumption.toFixed(2)}
        unit="⚡️/s"
        label="Energy consumption"
      />
      <StatCard
        value={energyProduction.toFixed(2)}
        unit="⚡️/s"
        label="Energy production"
      />
    </div>
  )
}
