import { classNames } from '@/utils/classNames'
import { useEffect } from 'react'
import { useState } from 'react'

export const SimpleStatCard = ({
  value,
  unit,
  label,
}: {
  value: string
  unit: string
  label: string
}) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="ml-1 text-xl text-gray-500">{unit}</span>
      </div>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
    </div>
  )
}

export const StatCard = ({
  display,
  label,
  unit,
  value,
}: {
  display: boolean
  label: string
  unit: string
  value: string
}) => {
  const [highlight, setHighlight] = useState(false)

  useEffect(() => {
    setHighlight(true)
    const timeoutId = setTimeout(() => {
      setHighlight(false)
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [value])

  if (!display) {
    return <></>
  }

  return (
    <div
      className={classNames(
        'rounded-lg p-4 shadow-md',
        highlight ? 'bg-gray-700 text-white' : 'bg-white'
      )}
    >
      <div className="flex items-baseline">
        <span
          className={`text-3xl font-bold ${highlight ? 'text-white' : 'text-gray-900'}`}
        >
          {value}
        </span>
        <span
          className={`ml-1 text-xl ${highlight ? 'text-white' : 'text-gray-500'}`}
        >
          {unit}
        </span>
      </div>
      <p
        className={`mt-1 text-sm ${highlight ? 'text-white' : 'text-gray-600'}`}
      >
        {label}
      </p>
    </div>
  )
}
