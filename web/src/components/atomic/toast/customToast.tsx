// customToast.js
import { toast } from 'react-toastify'
import React from 'react'

import WarningIcon from '@/assets/icons/WarningIcon'
import AlertIcon from '@/assets/icons/AlertIcon'
import CheckCircleIcon from "@/assets/icons/CheckCircleIcon.svg"
const defaultToastId = "default-toast-id"
const customToast = {
    success(msg: string, options = {}) {
        return toast.success(msg, {
            toastId: defaultToastId,
            className: 'toast-message toast-success ',
            icon: <CheckCircleIcon />,
            closeButton: false,
            ...options,
        })
    },
    error(msg: string, options = {}) {
        return toast.error(msg, {
            toastId: defaultToastId,
            className: 'toast-message toast-error text-red-200',
            icon: <AlertIcon />,
            closeButton: false,
            ...options,

        })
    },
    warn(msg: string, options = {}) {
        return toast.warn(msg, {
            toastId: defaultToastId,
            className: 'toast-message toast-info',
            closeButton: false,
            icon: <WarningIcon />,
            ...options,
        })
    }
}
export default customToast
