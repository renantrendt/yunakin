// components/Modal.tsx
import CrossIcon from '@/assets/icons/CrossIcon'
import IconButton from '@/components/atomic/icon-button/IconButton'
import Typography from '@/components/atomic/typography/Typography'
import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode | string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <dialog className={`modal  ${isOpen ? "modal-open" : ""} `}>
      <div className="modal-box bg-gray-100 ">
        <form method='dialog'>
          <IconButton onClick={onClose} icon={<CrossIcon />} className='absolute right-2 top-2' />
        </form>
        <Typography type='h3' className='font-bold'>{title}</Typography>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
