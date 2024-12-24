import { ChopWood } from '../ChopWood'

export const ChopFirstWood = () => {
  return (
    <div className="space-y-4">
      <p>
        All resources (except Science) are automatically transformed into watts
        when harvested.
      </p>
      <div className="flex items-center justify-between">
        <p>Continue chopping wood to increase watts !</p>
        <ChopWood />
      </div>
    </div>
  )
}
