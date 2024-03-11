'use server'
import { prisma } from "@/lib/prisma"

export async function changeUserRole(userId: string, role: string) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            role: role
        }
    })
    return user;
}
export async function deleteUser(userId: string) {
    const user = await prisma.user.delete({
        where: {
            id: userId
        },
    })
    return user;
}

export async function updateUser(userId: string, data: any) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            ...data
        }
    })
    return user;
}