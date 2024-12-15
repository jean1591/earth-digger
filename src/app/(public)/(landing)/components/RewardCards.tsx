'use client'

import {
  ENERGY_PRODUCTION_PER_SECOND,
  Inventory,
  Stats,
  addBooster,
  addDigger,
  addEnergy,
  levelUp,
  upgradeDigger,
  upgradeEnergy,
} from '@/store/features/dashboard/slice'
import {
  PiBatteryCharging,
  PiGift,
  PiLightning,
  PiRecycle,
  PiRobot,
  PiSpeedometer,
} from 'react-icons/pi'
import {
  resumeGame,
  setDisplayRewardCards,
} from '@/store/features/interactions/slice'
import { useDispatch, useSelector } from 'react-redux'

import { IconType } from 'react-icons'
import { Modal } from '@/components/Modal'
import { RootState } from '@/store/store'
import { classNames } from '@/utils/classNames'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
}

type PrizeFunction = () =>
  | ReturnType<typeof addBooster>
  | ReturnType<typeof addDigger>
  | ReturnType<typeof addEnergy>
  | ReturnType<typeof upgradeDigger>
  | ReturnType<typeof upgradeEnergy>
type RewardType =
  | 'addBooster'
  | 'addDigger'
  | 'addEnergy'
  | 'upgradeDigger'
  | 'upgradeEnergy'
interface Reward {
  description: string
  icon: IconType
  label: string
  prize: PrizeFunction
}
type RewardMapper = Record<RewardType, Reward>

const rewardsMapper: RewardMapper = {
  addDigger: {
    description: 'Add a new auto-digger - Consume 20 ⚡️/s',
    icon: PiRobot,
    label: 'Auto-digger',
    prize: addDigger,
  },
  addEnergy: {
    description: 'Add a robot that produces energy - Produce 30 ⚡️/s',
    icon: PiLightning,
    label: 'Energy producer',
    prize: addEnergy,
  },
  addBooster: {
    description: 'Boost all diggers and enery producers stats',
    icon: PiSpeedometer,
    label: 'Booster',
    prize: addBooster,
  },
  upgradeDigger: {
    description: 'Upgrade all diggers with a 5% boost',
    icon: PiRecycle,
    label: 'Digger upgrade',
    prize: upgradeDigger,
  },
  upgradeEnergy: {
    description: 'Upgrade all energy producers with a 5% boost',
    icon: PiBatteryCharging,
    label: 'Energy upgrade',
    prize: upgradeEnergy,
  },
}

const computeRewards = (
  level: number,
  inventory: Inventory,
  stats: Stats
): RewardType[] => {
  const { energyConsumption, energyProduction } = stats

  let rewards: RewardType[] = []

  if (level === 0) {
    rewards.push('addDigger')

    return rewards
  }

  if (level === 1) {
    rewards.push('addDigger')
    rewards.push('addEnergy')
    rewards.push('addBooster')

    return rewards
  }

  // TODO: change to add display stats
  if (energyConsumption >= energyProduction - ENERGY_PRODUCTION_PER_SECOND) {
    rewards.push('addEnergy')
  }

  rewards.push('addDigger')
  rewards.push('addBooster')

  return rewards
}

export const RewardCards = () => {
  const { displayRewardCards } = useSelector(
    (state: RootState) => state.interactions
  )
  const { level, inventory, stats } = useSelector(
    (state: RootState) => state.dashboard
  )

  const rewards = computeRewards(level, inventory, stats)

  return (
    <Modal title="Level Up !" open={displayRewardCards} icon={PiGift}>
      <div className={classNames(`grid grid-cols-${rewards.length} gap-4`)}>
        {rewards.map((reward) => (
          <motion.div
            key={reward}
            animate="visible"
            initial="hidden"
            variants={variants}
          >
            <Card reward={rewardsMapper[reward]} />
          </motion.div>
        ))}
      </div>
    </Modal>
  )
}

const Card = ({ reward }: { reward: Reward }) => {
  const dispatch = useDispatch()
  const { description, icon, label, prize } = reward
  const Icon = icon

  const onCardClicked = () => {
    dispatch(setDisplayRewardCards(false))
    dispatch(levelUp())
    dispatch(prize())
    dispatch(resumeGame())
  }

  return (
    <div
      onClick={onCardClicked}
      className="cursor-pointer rounded-xl bg-gradient-to-tr from-indigo-500 via-green-500 to-blue-500 p-1"
    >
      <div className="flex h-40 flex-col items-center justify-between rounded-xl bg-white p-4">
        <p className="text-xl font-bold leading-tight tracking-tight">
          {label}
        </p>
        <Icon className="size-8" />
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}
