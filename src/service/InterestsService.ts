import {Interest, PrismaClient, User} from '@prisma/client'
import {CreationUserData} from '../models/userModels'

const prisma = new PrismaClient()

export class InterestsService {
    async getInterests() {
        return await prisma.interest.findMany()
    }

    async selectMatching(vk_id: number) {
        const my_interests = await prisma.user.findUnique({
            where: {vk_id: vk_id},
            select: {
                UserInterests: {
                    select: {
                        interest: {
                            select: {
                                title: true,
                                id: true
                            }
                        }
                    }
                }
            }
        })
        const users_int = await prisma.user.findMany({
            where: {
                NOT: {
                    vk_id: vk_id
                }
            },
            select: {
                vk_id: true,
                UserInterests: {
                    select: {
                        interest: {
                            select: {
                                id: true
                            }
                        }
                    }
                },
            }
        })
        const users_matching = users_int.map(e => {
            return {
                interests: e.UserInterests,
                vk_id: e.vk_id,
                matching: my_interests.UserInterests.filter(s => e.UserInterests.map(x => x.interest.id).includes(s.interest.id)).length
            }
        })
        return users_matching.sort((a, b) => {
            return a.matching - b.matching
        }).map(e => {
            return {
                vk_id: e.vk_id,
                test_sorted: e.matching
            }
        })
    }
}