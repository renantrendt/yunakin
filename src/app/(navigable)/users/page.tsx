
import { auth } from '@/auth';
import UsersTable from '@/components/organisms/UsersTable';
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation';
import React from 'react'

const UsersPage = async () => {
    const session = await auth()

    if (session?.user?.role !== 'ADMIN') {
        return redirect('/dashboard')
    }

    const users = await prisma.user.findMany();

    return (
        <UsersTable users={users} />
    )
}

export default UsersPage