import { classNames } from '@/utils/classNames'

export const Container = ({
  children,
  size = 'large',
  spaceY = 'space-y-12',
}: {
  children: React.ReactNode
  size?: 'large' | 'medium' | 'small' | 'xsmall'
  spaceY?: string
}) => {
  return (
    <div
      className={classNames(
        'mx-auto px-4 sm:px-6 lg:px-8',
        size === 'large' ? 'max-w-7xl' : '',
        size === 'medium' ? 'max-w-5xl' : '',
        size === 'small' ? 'max-w-4xl' : '',
        size === 'xsmall' ? 'max-w-2xl' : '',
        spaceY
      )}
    >
      {children}
    </div>
  )
}
