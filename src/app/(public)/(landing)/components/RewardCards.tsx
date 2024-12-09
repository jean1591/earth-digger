'use client'

import { addDigger, addEnergy, levelUp } from '@/store/features/dashboard/slice'
import { useDispatch, useSelector } from 'react-redux'

import { Container } from '@/components/Container'
import { RootState } from '@/store/store'
import { motion } from 'framer-motion'
import { setDisplayRewardCards } from '@/store/features/interactions/slice'

const variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
}

export const RewardCards = () => {
  const dispatch = useDispatch()
  const { displayRewardCards } = useSelector(
    (state: RootState) => state.interactions
  )

  if (!displayRewardCards) {
    return <></>
  }

  const onCardClicked = () => {
    dispatch(setDisplayRewardCards(false))
    dispatch(levelUp())
  }

  const addDiggerCard = () => dispatch(addDigger())
  const addEnergyCard = () => dispatch(addEnergy())

  return (
    <Container size="xsmall">
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          animate="visible"
          className="cursor-pointer"
          initial="hidden"
          onClick={onCardClicked}
          variants={variants}
        >
          <Card label="Card 1" />
        </motion.div>
        <motion.div
          animate="visible"
          className="cursor-pointer"
          initial="hidden"
          onClick={onCardClicked}
          variants={variants}
        >
          <Card label="Card 2" />
        </motion.div>
        <motion.div
          animate="visible"
          className="cursor-pointer"
          initial="hidden"
          onClick={onCardClicked}
          variants={variants}
        >
          <Card label="Card 3" />
        </motion.div>
      </div>
    </Container>
  )
}

const Card = ({ label }: { label: string }) => {
  return (
    <div className="rounded-xl border border-blue-500 bg-blue-200 p-8">
      <p className="text-xl font-bold">{label}</p>
    </div>
  )
}
