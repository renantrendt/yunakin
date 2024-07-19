// customToast.js
import { toast } from 'react-toastify'
import React from 'react'

import ErrorIcon from "@/icons/toast/error-icon.svg"
import SuccessIcon from "@/icons/toast/success-icon.svg"
import WarningIcon from "@/icons/toast/warning-icon.svg"
const defaultToastId = "default-toast-id"


const customToast = {
    success(msg: string, options = {}) {
        return toast.success(msg, {
            toastId: defaultToastId,
            className: 'toast-message toast-success ',
            icon: <SuccessIcon />,
            closeButton: false,
            ...options,
        })
    },
    error(msg: string, options = {}) {
        return toast.error(msg, {
            toastId: defaultToastId,
            className: 'toast-message toast-error text-red-200',
            icon: <ErrorIcon />,
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
