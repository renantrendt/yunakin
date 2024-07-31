// components/Modal.tsx
import React, { useEffect } from 'react'
import { cn } from '@/utils/cn'
import { Cross1Icon } from '@radix-ui/react-icons'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode | string
  modalClassName?: string
  closeOnOutsideClick?: boolean
  showCloseButton?: boolean
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, showCloseButton = true, className, modalClassName, closeOnOutsideClick = true }) => {
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
      <div className={cn("modal-box relative  max-h-[80vh] w-full  sm:max-w-[300px] dark:bg-card-dark min-w-[300px] md:max-w-[448px] lg:max-w-[620px] !p-0 !m-0 overflow-hidden  ", className)}>
        {/* <form method='dialog'>
          <Button onClick={onClose} variant='secondary' size='sm' icon={<CrossIcon />} className='absolute !w-fit !p-2 !min-w-fit  right-6 top-2' />
        </form> */}
        {showCloseButton &&
          <div className='justify-between flex  flex-row-reverse w-fit  text-right  z-30  bg-transparent bg-white p-2 rounded-full   right-8 top-4 absolute '>
            <Cross1Icon onClick={onClose} className='  relative cursor-pointer !w-fit !p-0 bg-transparent border-none hover:bg-transparent !min-w-fit  ' />
          </div>
        }
        <div className={cn('overflow-y-scroll no-scrollbar bg-white  max-h-[80vh]', {
          'mb-10 ': showCloseButton,
        })}>
          {children}
        </div>
      </div>
    </dialog>
  )
}

export default Modal
