'use client'
import DashboardNavbar from '@/components/dashboard/navbar/navbar'
import Sidebar from '@/components/navigation/Sidebar'
import AuthProvider from '@/lib/providers/auth-provider'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [showMenu, setShowMenu] = React.useState(false)
  return (
    <AuthProvider>
      <div className='flex h-screen  text-black dark:text-white '>

        <Sidebar showMenu={showMenu} onLinkClick={() => {
          setShowMenu(false)
        }} />
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden min-h-screen' >
          <DashboardNavbar onClick={() => setShowMenu(true)} />
          <main className='mx-auto w-full h-full  bg-landing-background pb-14 lg:pb-20 ' onClick={() => setShowMenu(false)}>
            {children}
          </main>
        </div>
      </div>
    </AuthProvider >
  )
}

export default Layout
