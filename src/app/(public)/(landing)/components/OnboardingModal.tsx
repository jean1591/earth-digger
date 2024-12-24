'use client'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { ChopFirstWood } from './onboarding/ChopFirstWood'
import { HireWoodChopperTutorial } from './onboarding/HireWoodChopperTutorial'
import { Modal } from '@/components/Modal'
import { PiGraduationCap } from 'react-icons/pi'
import { RootState } from '@/store/store'
import { setDisplayOnbardingModal } from '@/store/features/interactions/slice'

const mapper: Record<string, () => JSX.Element> = {
  chopFirstWood: () => <ChopFirstWood />,
  hireWoodChopperTutorial: () => <HireWoodChopperTutorial />,
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

    if (watt === 10) {
      setComponent(mapper.hireWoodChopperTutorial())
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
