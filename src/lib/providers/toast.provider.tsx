'use client'
import { ToastContainer } from 'react-toastify'
import React from 'react'
interface ToastProviderProps {
    children: React.ReactNode
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    )
}
