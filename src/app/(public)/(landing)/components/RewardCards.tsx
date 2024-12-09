'use client'

import { addDigger, addEnergy, levelUp } from '@/store/features/dashboard/slice'
import { useDispatch, useSelector } from 'react-redux'

import { Modal } from '@/components/Modal'
import { PiGift } from 'react-icons/pi'
import { RootState } from '@/store/store'
import { motion } from 'framer-motion'
import { setDisplayRewardCards } from '@/store/features/interactions/slice'

const variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
}

type PrizeFunction = () =>
  | ReturnType<typeof addDigger>
  | ReturnType<typeof addEnergy>
type RewardType = 'addDigger' | 'addEnergy'
interface Reward {
  description: string
  label: string
  prize: PrizeFunction
}
type RewardMapper = Record<RewardType, Reward>

const rewardsMapper: RewardMapper = {
  addDigger: {
    description: 'Add a new auto-digger',
    label: 'Auto-digger',
    prize: addDigger,
  },
  addEnergy: {
    description: 'Add a robot that produces energy',
    label: 'Energy producer',
    prize: addEnergy,
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
          <Card reward={rewardsMapper['addEnergy']} />
        </motion.div>
      </div>
    </Modal>
  )
}

const Card = ({ reward }: { reward: Reward }) => {
  const dispatch = useDispatch()
  const { description, label, prize } = reward

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
      <div className="rounded-xl bg-white p-4">
        <p className="text-xl font-bold leading-tight tracking-tight">
          {label}
        </p>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}
