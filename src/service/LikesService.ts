import {PrismaClient, Status} from '@prisma/client'
const prisma = new PrismaClient()

export class LikesService {
    async doLike(my_vk_id: number, user_to_like: number, status: Status) {
        await prisma.swipes.findFirstOrThrow({
            where: {
                AND: [
                    {from: my_vk_id},
                    {To: user_to_like},
                    {status: status}
                ]
            }
        })
        await prisma.swipes.create({
            data: {
                status: status,
                from: my_vk_id,
                To: user_to_like
            }
        })

        if (status === Status.accepted) {
            await prisma.swipes.findFirstOrThrow({
                where: {
                    AND: [
                        {To: my_vk_id},
                        {from: user_to_like},
                        {status: Status.accepted}
                    ]
                }
            }).then(() => {
                //TODO: вызов уведомления
            }).catch()
        }
    }

    async getMyLikedUsers(vk_id: number) {
        const liked_users = await prisma.swipes.findMany({
            where: {
                AND: [
                    {from: vk_id},
                    {status: Status.accepted}
                ]
            },
            select: {
                To: true
            }
        })
        const vk_ids = liked_users.map(e => {
            return {vk_id: e.To}
        })
        return await vk_ids.map(async e => await prisma.user.findUnique({
            where: {
                vk_id: e.vk_id
            }
        }))
    }

    async getUsersWhoLikedMe(vk_id: number) {
        const liked_users = await prisma.swipes.findMany({
            where: {
                AND: [
                    {To: vk_id},
                    {status: Status.accepted}
                ]
            },
            select: {
                To: true
            }
        })
        const vk_ids = liked_users.map(e => {
            return {vk_id: e.To}
        })
        return await vk_ids.map(async e => await prisma.user.findUnique({
            where: {
                vk_id: e.vk_id
            }
        }))
    }
}