import { addWoodChopper } from '@/store/features/dashboard/slice'
import { setDisplayOnbardingModal } from '@/store/features/interactions/slice'
import { useDispatch } from 'react-redux'

export const HireWoodChopperButton = ({
  costs,
  disabled,
}: {
  costs: string
  disabled: boolean
}) => {
  const dispatch = useDispatch()

  const handleAddWoodChopper = () => {
    dispatch(addWoodChopper(1))
    dispatch(setDisplayOnbardingModal(false))
  }

  return (
    <button
      disabled={disabled}
      onClick={handleAddWoodChopper}
      className="min-w-24 rounded-sm border border-white px-4 py-2 text-left transition-colors duration-300 ease-in-out hover:bg-zinc-800 disabled:border-zinc-700 disabled:text-zinc-700"
    >
      <p>🪓 Hire wood chopper</p>
      <p className="text-sm">Costs: {costs} watts</p>
    </button>
  )
}
