import React from 'react'
import EditProfile from '@/containers/edit-profile/EditProfile'
import EditPassword from '@/containers/edit-profile/EditPassword'
const AccountSettings = () => {
    return (
        <div className='container mx-auto pt-24 px-24 grid grid-cols-12 gap-x-8 justify-items-start align-top'>
            <div className=' col-span-6 w-full'>
                <EditProfile />
            </div>
            <div className='col-span-6 w-full'>
                <EditPassword />
            </div>
        </div >
    )
}

export default AccountSettings