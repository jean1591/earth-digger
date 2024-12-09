'use client'

import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export const Inventory = () => {
  const { inventory } = useSelector((state: RootState) => state.dashboard)

  const {
    boosts: {
      diggingSpeedMultiplier,
      energyProductionMultiplier,
      xpMultiplier,
    },
    robots: { boosters, diggers, energy },
  } = inventory

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-lg font-bold">Robots</p>
        <InventoryLine label="Diggers" value={diggers} />
        <InventoryLine label="Energy" value={energy} />
        <InventoryLine label="Boosters" value={boosters} />
      </div>

      <div className="space-y-2">
        <p className="text-lg font-bold">Multipliers</p>
        <InventoryLine label="Digging speed" value={diggingSpeedMultiplier} />
        <InventoryLine label="Energy" value={energyProductionMultiplier} />
        <InventoryLine label="XP" value={xpMultiplier} />
      </div>
    </div>
  )
}

const InventoryLine = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <p className="text-left text-gray-500">{label}</p>
      <p className="text-right font-bold">{value}</p>
    </div>
  )
}
