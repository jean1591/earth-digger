'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'

import { IconType } from 'react-icons'
import { ReactNode } from 'react'
import { useDispatch } from 'react-redux'

export const Modal = ({
  children,
  icon,
  onClose,
  open,
  title,
}: {
  children: ReactNode
  icon: IconType
  onClose: () => { type: string; payload?: any }
  open: boolean
  title: string
}) => {
  const dispatch = useDispatch()

  const Icon = icon
  return (
    <Dialog
      open={open}
      onClose={() => dispatch(onClose())}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-zinc-900/80 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-sm border border-white bg-zinc-800 p-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-zinc-100">
                <Icon aria-hidden="true" className="size-8 text-zinc-600" />
              </div>
              <div className="mt-2 text-center">
                <DialogTitle
                  as="h3"
                  className="text-3xl font-semibold text-white"
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
