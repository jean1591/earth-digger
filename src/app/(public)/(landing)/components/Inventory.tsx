'use client'

import { useEffect, useState } from 'react'

import { Inventory as InventoryType } from '@/store/features/dashboard/slice'
import { RootState } from '@/store/store'
import { classNames } from '@/utils/classNames'
import { useSelector } from 'react-redux'

export const Inventory = () => {
  const { inventory } = useSelector((state: RootState) => state.dashboard)

  const displayRobots = (inventory: InventoryType) => {
    const {
      robots: { boosters, diggers, energy },
    } = inventory
    return [boosters, diggers, energy].some((value) => value > 0)
  }

  const displayMultipliers = (inventory: InventoryType) => {
    const {
      boosts: {
        diggingSpeedMultiplier,
        energyProductionMultiplier,
        xpMultiplier,
      },
    } = inventory
    return [
      diggingSpeedMultiplier,
      energyProductionMultiplier,
      xpMultiplier,
    ].some((value) => value > 1)
  }

  const {
    boosts: {
      diggingSpeedMultiplier,
      energyProductionMultiplier,
      xpMultiplier,
    },
    robots: { boosters, diggers, energy },
  } = inventory

  return (
    <div className="space-y-8">
      {displayRobots(inventory) && (
        <div className="space-y-2">
          <p className="text-lg font-bold">Robots</p>
          <InventoryLine
            display={diggers > 0}
            label="Diggers"
            value={diggers}
          />
          <InventoryLine display={energy > 0} label="Energy" value={energy} />
          <InventoryLine
            display={boosters > 0}
            label="Boosters"
            value={boosters}
          />
        </div>
      )}

      {displayMultipliers(inventory) && (
        <div className="space-y-2">
          <p className="text-lg font-bold">Multipliers</p>
          <InventoryLine
            display={diggingSpeedMultiplier > 1}
            label="Digging speed"
            value={diggingSpeedMultiplier}
          />
          <InventoryLine
            display={energyProductionMultiplier > 1}
            label="Energy"
            value={energyProductionMultiplier}
          />
          <InventoryLine
            display={xpMultiplier > 1}
            label="XP"
            value={xpMultiplier}
          />
        </div>
      )}
    </div>
  )
}

const InventoryLine = ({
  label,
  value,
  display,
}: {
  label: string
  value: number
  display: boolean
}) => {
  const [highlight, setHighlight] = useState(false)

  useEffect(() => {
    setHighlight(true)
    const timeoutId = setTimeout(() => {
      setHighlight(false)
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [value])

  if (!display) {
    return <></>
  }

  return (
    <div
      className={classNames(
        'grid grid-cols-2 gap-8 transition-colors duration-200 ease-in-out',
        highlight ? 'bg-gray-700 text-white' : ''
      )}
    >
      <p
        className={classNames(
          'text-left',
          highlight ? 'text-white' : 'text-gray-500'
        )}
      >
        {label}
      </p>
      <p className="text-right font-bold">{value}</p>
    </div>
  )
}
