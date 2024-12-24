import { HireWoodChopperButton } from '../generators/HireWoodChopperButton'
import { initialParams } from '@/store/features/dashboard/slice'

export const HireWoodChopperTutorial = () => {
  return (
    <div className="space-y-4">
      <p>Wood choppers will automatically chop wood for you.</p>
      <div className="flex items-center justify-between">
        <p>Hire your first wood chopper !</p>
        <HireWoodChopperButton
          costs={initialParams.woodChopper.costBase.toFixed(0)}
          disabled={false}
        />
      </div>
    </div>
  )
}
