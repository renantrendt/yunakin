'use client'
import DashboardNavbar from '@/components/dashboard/navbar/Navbar'
import Sidebar from '@/components/navigation/Sidebar'
import AuthProvider from '@/lib/providers/auth-provider'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <AuthProvider>
      <div className='grid w-full  grid-cols-12'>
        <div className='grid-cols-4 col-span-2'>
          <Sidebar />
        </div>
        <div className='flex flex-col justify-start col-span-10'>
          <DashboardNavbar />
          <main className='pt-8 mx-auto '>
            {children}
          </main>
        </div>

      </div>
    </AuthProvider>
  )
}

export default Layout
