'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'

import { IconType } from 'react-icons'
import { ReactNode } from 'react'

export const Modal = ({
  children,
  icon,
  open,
  title,
}: {
  children: ReactNode
  icon: IconType
  open: boolean
  title: string
}) => {
  const Icon = icon
  return (
    <Dialog open={open} onClose={() => {}} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white p-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <Icon aria-hidden="true" className="size-8 text-green-600" />
              </div>
              <div className="mt-2 text-center">
                <DialogTitle
                  as="h3"
                  className="text-3xl font-semibold text-gray-900"
                >
                  {title}
                </DialogTitle>
              </div>
            </div>

            <div className="mt-12">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
