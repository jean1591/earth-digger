'use client'

import { PiGift, PiLightning, PiRobot, PiSpeedometer } from 'react-icons/pi'
import {
  addBooster,
  addDigger,
  addEnergy,
  levelUp,
} from '@/store/features/dashboard/slice'
import { useDispatch, useSelector } from 'react-redux'

import { IconType } from 'react-icons'
import { Modal } from '@/components/Modal'
import { RootState } from '@/store/store'
import { motion } from 'framer-motion'
import { setDisplayRewardCards } from '@/store/features/interactions/slice'

const variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
}

type PrizeFunction = () =>
  | ReturnType<typeof addBooster>
  | ReturnType<typeof addDigger>
  | ReturnType<typeof addEnergy>
type RewardType = 'addDigger' | 'addBooster' | 'addEnergy'
interface Reward {
  description: string
  icon: IconType
  label: string
  prize: PrizeFunction
}
type RewardMapper = Record<RewardType, Reward>

const rewardsMapper: RewardMapper = {
  addDigger: {
    description: 'Add a new auto-digger',
    icon: PiRobot,
    label: 'Auto-digger',
    prize: addDigger,
  },
  addEnergy: {
    description: 'Add a robot that produces energy',
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
}

export const RewardCards = () => {
  const { displayRewardCards } = useSelector(
    (state: RootState) => state.interactions
  )

  return (
    <Modal title="Level Up !" open={displayRewardCards} icon={PiGift}>
      <div className="grid grid-cols-3 gap-4">
        <motion.div animate="visible" initial="hidden" variants={variants}>
          <Card reward={rewardsMapper['addDigger']} />
        </motion.div>
        <motion.div animate="visible" initial="hidden" variants={variants}>
          <Card reward={rewardsMapper['addEnergy']} />
        </motion.div>
        <motion.div animate="visible" initial="hidden" variants={variants}>
          <Card reward={rewardsMapper['addBooster']} />
        </motion.div>
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
