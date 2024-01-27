'use client'
import DashboardNavbar from '@/components/dashboard/navbar/navbar'
import Sidebar from '@/components/navigation/Sidebar'
import AuthProvider from '@/lib/providers/auth-provider'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <AuthProvider>
      <div className='flex h-screen  text-black dark:text-white'>
        <aside className=' z-30 flex h-screen  text-white overflow-y-hidden w-72.5 flex-col bg-black darK:bg-gray-700'>
          <Sidebar />
        </aside>
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          <DashboardNavbar />
          <main className='mx-auto max-w-screen-2xl w-full h-screen bg-white dark:bg-gray-600 p-4 md:p-6 2xl:p-10 '>
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}

export default Layout
