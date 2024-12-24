'use client'

import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export const Stats = () => {
  const { watt } = useSelector((state: RootState) => state.dashboard)

  return <div className="text-white">{watt}</div>
}
