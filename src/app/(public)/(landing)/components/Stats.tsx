'use client'

import { RootState } from '@/store/store'
import { StatCard } from './StatCard'
import { useSelector } from 'react-redux'

export const Stats = () => {
  const {
    depth,
    inventory: { robots, boosts },
  } = useSelector((state: RootState) => state.dashboard)
  const { diggers, energy } = robots
  const { diggingSpeedMultiplier, energyProductionMultiplier } = boosts

  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard value={depth.toFixed(2)} unit="m" label="Depth" />
      <StatCard
        value={(diggers * diggingSpeedMultiplier).toFixed(2)}
        unit="m/s"
        label="Digging speed"
      />
      <StatCard
        value={(diggers * 20).toFixed(2)}
        unit="⚡️/s"
        label="Energy consumption"
      />
      <StatCard
        value={((energy * 30 + 200) * energyProductionMultiplier).toFixed(2)}
        unit="⚡️/s"
        label="Energy production"
      />
    </div>
  )
}
