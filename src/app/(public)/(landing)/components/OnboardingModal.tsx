'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { ChopWood } from './ChopWood'
import { Modal } from '@/components/Modal'
import { PiGraduationCap } from 'react-icons/pi'
import { RootState } from '@/store/store'
import { setDisplayOnbardingModal } from '@/store/features/interactions/slice'

const ChopFirstWood = () => {
  const dispatch = useDispatch()

  const closeChopFirstWoodModal = () => {
    dispatch(setDisplayOnbardingModal(false))
  }

  return (
    <div className="space-y-4">
      <p>
        All resources (except Science) are automatically transformed into watts
        when harvested.
      </p>
      <div className="flex items-center justify-between">
        <p>Continue chopping wood to increase watts !</p>
        <ChopWood additionalMethod={closeChopFirstWoodModal} />
      </div>
    </div>
  )
}

const mapper: Record<string, () => JSX.Element> = {
  chopFirstWood: () => <ChopFirstWood />,
}

export const OnboardingModal = () => {
  const [component, setComponent] = useState<JSX.Element | null>(null)
  const dispatch = useDispatch()

  const { displayOnbardingModal } = useSelector(
    (state: RootState) => state.interactions
  )
  const { watt } = useSelector((state: RootState) => state.dashboard)

  useEffect(() => {
    if (watt === 1) {
      setComponent(mapper.chopFirstWood())
      dispatch(setDisplayOnbardingModal(true))
    }
  }, [watt, dispatch])

  return (
    <Modal
      icon={PiGraduationCap}
      onClose={() => dispatch(setDisplayOnbardingModal(false))}
      open={displayOnbardingModal}
      title="Onboarding"
    >
      {component}
    </Modal>
  )
}
