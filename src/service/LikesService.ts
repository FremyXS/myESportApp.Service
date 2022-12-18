import {PrismaClient, Status} from '@prisma/client'
import {DoLikesRequest} from "../models/likesModel";
const prisma = new PrismaClient()

export class LikesService {
    async doLike(data: DoLikesRequest) {
        // await prisma.swipes.findFirstOrThrow({
        //     where: {

        //     }
        // })
        // console.log(1)
        const currentLike = await prisma.swipes.findFirst({
            where: {
                AND: [
                    {from: data.my_vk_id},
                    {To: data.user_to_like},
                ]
            }
        })
        if (currentLike) return currentLike;
        await prisma.swipes.create({
            data: {
                status: data.status,
                from: data.my_vk_id,
                To: data.user_to_like
            }
        })
        // if (data.status === Status.accepted) {
        //     await prisma.swipes.findFirstOrThrow({
        //         where: {
        //             AND: [
        //                 {To: data.my_vk_id},
        //                 {from: data.user_to_like},
        //                 {status: Status.accepted}
        //             ]
        //         }
        //     })
        // }
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
                To: true,
            },
        })
        const vk_ids = liked_users.map(e => {
            return {vk_id: e.To}
        })
        return vk_ids
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
                from: true
            }
        })
        const vk_ids = liked_users.map(e => {
            return {vk_id: e.from}
        })
        return vk_ids
    }

    async getAllLikesMe(vk_id: number) {
        const likes_users = await prisma.swipes.findMany({
            where: {
                from: vk_id
            },
            select: {
                To: true
            }
        })
        const vk_ids = likes_users.map(e => {
            return e.To
        })
        return vk_ids
    }
}