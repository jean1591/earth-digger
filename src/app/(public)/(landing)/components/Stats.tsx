'use client'

import { SimpleStatCard, StatCard } from './StatCard'

import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export const Stats = () => {
  const {
    depth,
    stats,
    hud: { stats: hudStats },
  } = useSelector((state: RootState) => state.dashboard)

  return (
    <div className="grid grid-cols-4 gap-4">
      <SimpleStatCard value={depth.toFixed(2)} unit="m" label="Depth" />
      <StatCard
        display={hudStats.diggingSpeed}
        label="Digging speed"
        unit="m/s"
        value={stats.diggingSpeed.toFixed(2)}
      />
      <StatCard
        display={hudStats.energyConsumption}
        label="Energy consumption"
        unit="⚡️/s"
        value={stats.energyConsumption.toFixed(2)}
      />
      <StatCard
        display={hudStats.energyProduction}
        label="Energy production"
        unit="⚡️/s"
        value={stats.energyProduction.toFixed(2)}
      />
    </div>
  )
}
