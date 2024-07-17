// components/Modal.tsx
import React, { useEffect } from 'react'
import Button from '@/components/atomic/button/Button'
import CrossIcon from "@/icons/cross-icon.svg"
import { cn } from '@/utils/cn'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode | string
  modalClassName?: string
  closeOnOutsideClick?: boolean
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className, modalClassName, closeOnOutsideClick = true }) => {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [onClose])

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget && closeOnOutsideClick) {
      onClose()
    }
  }
  return (
    <dialog className={cn(`modal  ${isOpen ? "modal-open" : ""} `, modalClassName)} onClick={handleClick}>
      <div className={cn("modal-box max-h-[80vh]  sm:max-w-[30px] bg-white dark:bg-card-dark min-w-[300px] md:max-w-[448px] lg:max-w-[620px] !p-0 !m-0 ", className)}>
        {/* <form method='dialog'>
          <Button onClick={onClose} variant='secondary' size='sm' icon={<CrossIcon />} className='absolute !w-fit !p-2 !min-w-fit  right-6 top-2' />
        </form> */}
        {children}
      </div>
    </dialog>
  )
}

export default Modal
