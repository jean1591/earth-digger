'use client'

import { SimpleStatCard, StatCard } from './StatCard'

import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export const Stats = () => {
  const { depth, stats } = useSelector((state: RootState) => state.dashboard)
  const { diggingSpeed, energyConsumption, energyProduction } = stats

  return (
    <div className="grid grid-cols-4 gap-4">
      <SimpleStatCard value={depth.toFixed(2)} unit="m" label="Depth" />
      <StatCard
        display={diggingSpeed > 0}
        label="Digging speed"
        unit="m/s"
        value={diggingSpeed.toFixed(2)}
      />
      <StatCard
        display={energyConsumption > 0}
        label="Energy consumption"
        unit="⚡️/s"
        value={energyConsumption.toFixed(2)}
      />
      <StatCard
        /* Voluntarily use of consumption */
        display={energyConsumption > 0}
        label="Energy production"
        unit="⚡️/s"
        value={energyProduction.toFixed(2)}
      />
    </div>
  )
}
