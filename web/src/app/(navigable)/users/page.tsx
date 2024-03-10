
import UsersTable from '@/components/organisms/UsersTable';
import { prisma } from '@/lib/prisma'

import React from 'react'

const UsersPage = async () => {

    const users = await prisma.user.findMany();

    return (
        <UsersTable users={users} />
    )
}

export default UsersPage