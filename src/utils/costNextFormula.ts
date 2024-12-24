export const costNextFormula = ({
  costBase,
  growthRate,
  quantityOwned,
}: {
  costBase: number
  growthRate: number
  quantityOwned: number
}) => {
  return costBase * growthRate ** quantityOwned
}
