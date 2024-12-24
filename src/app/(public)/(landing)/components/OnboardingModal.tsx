'use client'

import { useDispatch, useSelector } from 'react-redux'

import { ChopWood } from './ChopWood'
import { Modal } from '@/components/Modal'
import { PiGraduationCap } from 'react-icons/pi'
import { RootState } from '@/store/store'
import { setDisplayOnbardingModal } from '@/store/features/interactions/slice'
import { useEffect } from 'react'

export const OnboardingModal = () => {
  const dispatch = useDispatch()

  const { displayOnbardingModal } = useSelector(
    (state: RootState) => state.interactions
  )
  const { watt } = useSelector((state: RootState) => state.dashboard)

  useEffect(() => {
    if (watt === 1) {
      dispatch(setDisplayOnbardingModal(true))
    }
  }, [watt, dispatch])

  return (
    <Modal
      icon={PiGraduationCap}
      onClose={() => setDisplayOnbardingModal(false)}
      open={displayOnbardingModal}
      title="Onboarding"
    >
      <ChopFirstWood />
    </Modal>
  )
}

const ChopFirstWood = () => {
  const dispatch = useDispatch()

  const closeChopFirstWoodModal = () =>
    dispatch(setDisplayOnbardingModal(false))

  return (
    <div className="space-y-4">
      <p>
        All resources (except Science) are automatically transformed into watts
        when harvested.
      </p>
      <div className="flex items-center justify-between">
        <p>Chop more wood to see the watt counter go up !</p>
        <ChopWood additionalMethod={closeChopFirstWoodModal} />
      </div>
    </div>
  )
}
