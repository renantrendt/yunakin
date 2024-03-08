'use client'
import DashboardNavbar from '@/components/dashboard/navbar/navbar'
import Sidebar from '@/components/navigation/Sidebar'
import AuthProvider from '@/lib/providers/auth-provider'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [showMenu, setShowMenu] = React.useState(false)
  return (
    <AuthProvider>
      <div className='flex h-screen  text-black dark:text-white'>

        <Sidebar />
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden' >
          <DashboardNavbar onClick={() => setShowMenu(true)} />
          <main className='mx-auto w-full  bg-white dark:bg-gray-800 p-4 md:p-6  ' onClick={() => setShowMenu(false)}>
            {children}
          </main>
        </div>
      </div>
    </AuthProvider >
  )
}

export default Layout
