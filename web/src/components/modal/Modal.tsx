// components/Modal.tsx
import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="modal modal-open ">
      <div className="modal-box bg-gray-100 dark:bg-gray-800">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
