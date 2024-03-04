import { prisma } from "@/lib/prisma"

export async function getChat(id: string, userId: string) {
    const chat = await prisma.chat.findFirst({
        where: {
            userId: userId
        },
        include: {
            messages: true
        }
    })

    if (!chat || (userId && chat.userId !== userId)) {
        return null
    }

    return chat
}
