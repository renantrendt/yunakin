
import { auth } from '@/auth';
import CategoriesTable from '@/components/organisms/CategoriesTable';
import UsersTable from '@/components/organisms/UsersTable';
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation';
import React from 'react'

const CategoriesPage = async () => {
    const session = await auth()

    if (session?.user?.role !== 'ADMIN') {
        return redirect('/dashboard')
    }

    const categories = await prisma.category.findMany();

    return (
        <CategoriesTable categories={categories} />
    )
}

export default CategoriesPage