// customToast.js
import { toast } from 'react-toastify'
import WarningIcon from '@/assets/icons/WarningIcon'
import AlertIcon from '@/assets/icons/AlertIcon'
import SucessIcon from '@/assets/icons/SucessIcon'

const customToast = {
  success (msg: string, options = {}) {
    return toast.success(msg, {
      ...options,
      className: 'toast-message toast-success ',
      icon: <SucessIcon />,
      closeButton: false
    })
  },
  error (msg: string, options = {}) {
    return toast.error(msg, {
      ...options,
      className: 'toast-message toast-error text-red-200',
      icon: <AlertIcon />,
      closeButton: false
    })
  },
  warn (msg: string, options = {}) {
    return toast.warn(msg, {
      ...options,
      className: 'toast-message toast-info',
      closeButton: false,
      icon: <WarningIcon />
    })
  }
}
export default customToast
