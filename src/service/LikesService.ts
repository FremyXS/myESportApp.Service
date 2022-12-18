import {PrismaClient, Status} from '@prisma/client'
import {DoLikesRequest} from "../models/likesModel";
const prisma = new PrismaClient()

import {socketGlobal} from "../socket";

export class LikesService {
    async doLike(data: DoLikesRequest) {
        // Проверка на уже поставленный лайк
        const currentLike = await prisma.swipes.findFirst({
            where: {
                AND: [
                    {from: data.my_vk_id},
                    {To: data.user_to_like},
                ]
            }
        })
        if (!currentLike) {
            await prisma.swipes.create({
                data: {
                    status: data.status === Status.accepted ? Status.waiting : Status.canceled,
                    from: data.user_to_like,
                    To: data.my_vk_id
                }
            })
        }
        else {
            if (currentLike.status !== Status.waiting) return currentLike;
            if (currentLike.status === Status.waiting) {
                await prisma.swipes.deleteMany({
                    where: {
                        AND: [
                            {from: data.my_vk_id},
                            {To: data.user_to_like},
                        ]
                    }
                })
            }
        }
        await prisma.swipes.create({
            data: {
                status: data.status,
                from: data.my_vk_id,
                To: data.user_to_like
            }
        })
        if (data.status === Status.accepted) {
            socketGlobal.emit("notification", {type: "LIKES", recipient: data.user_to_like, sender: data.my_vk_id})
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

    async getUserAcceptStatus(vk_id: number) {
        const likes_users = await prisma.swipes.findMany({
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
        const waiting_status = await prisma.swipes.findMany({
            where: {
                AND: [
                    {from: vk_id},
                    {status: Status.waiting}
                ]
            },
            select: {
                To: true,
            }
        })

        let matching_users = [];
        likes_users.forEach(e => {
            if (waiting_status.find(id => id.To === e.from)) {
                matching_users.push(e.from)
                socketGlobal.emit("notification", {type: "LIKES", recipient: vk_id, sender: e.from})
            }
        })
        return matching_users;
    }
}