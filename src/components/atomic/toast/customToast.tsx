// customToast.js
import { toast } from 'react-toastify'
import React from 'react'

import AlertIcon from '@/icons/AlertIcon'
const defaultToastId = "default-toast-id"

const WarningIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#FFF199" />
        <path d="M15.375 15.375L15.4096 15.3577C15.8872 15.1189 16.4249 15.5503 16.2954 16.0683L15.7046 18.4317C15.5751 18.9497 16.1128 19.3811 16.5904 19.1423L16.625 19.125M23.5 16C23.5 20.1421 20.1421 23.5 16 23.5C11.8579 23.5 8.5 20.1421 8.5 16C8.5 11.8579 11.8579 8.5 16 8.5C20.1421 8.5 23.5 11.8579 23.5 16ZM16 12.875H16.0063V12.8813H16V12.875Z" stroke="#2D2700" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>


)

const SuccessIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#CCFFD4" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.875 16C7.875 11.5127 11.5127 7.875 16 7.875C20.4873 7.875 24.125 11.5127 24.125 16C24.125 20.4873 20.4873 24.125 16 24.125C11.5127 24.125 7.875 20.4873 7.875 16ZM19.0086 14.4883C19.2092 14.2074 19.1442 13.817 18.8633 13.6164C18.5824 13.4158 18.192 13.4808 17.9914 13.7617L15.2952 17.5364L13.9419 16.1831C13.6979 15.939 13.3021 15.939 13.0581 16.1831C12.814 16.4271 12.814 16.8229 13.0581 17.0669L14.9331 18.9419C15.063 19.0719 15.2435 19.138 15.4266 19.1229C15.6096 19.1077 15.7768 19.0128 15.8836 18.8633L19.0086 14.4883Z" fill="#00CE21" />
    </svg>

)

const ErrorIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#FFCCCC" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 7.875C11.5127 7.875 7.875 11.5127 7.875 16C7.875 20.4873 11.5127 24.125 16 24.125C20.4873 24.125 24.125 20.4873 24.125 16C24.125 11.5127 20.4873 7.875 16 7.875ZM14.5669 13.6831C14.3229 13.439 13.9271 13.439 13.6831 13.6831C13.439 13.9271 13.439 14.3229 13.6831 14.5669L15.1161 16L13.6831 17.4331C13.439 17.6771 13.439 18.0729 13.6831 18.3169C13.9271 18.561 14.3229 18.561 14.5669 18.3169L16 16.8839L17.4331 18.3169C17.6771 18.561 18.0729 18.561 18.3169 18.3169C18.561 18.0729 18.561 17.6771 18.3169 17.4331L16.8839 16L18.3169 14.5669C18.561 14.3229 18.561 13.9271 18.3169 13.6831C18.0729 13.439 17.6771 13.439 17.4331 13.6831L16 15.1161L14.5669 13.6831Z" fill="#E90000" />
    </svg>

)
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
