import {PrismaClient} from '@prisma/client'
import {UpdateUserInterests} from "../models/interestsModel";
import {UserService} from "./UserService"

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
        const serv = new UserService()
        return users_matching.sort((a, b) => {
            return b.matching - a.matching;
        }).map(async (e) => {
                return serv.getUserProfile({vk_id: e.vk_id});
            }
        )
    }

    async getUserInterests(vk_id: number) {
        return await prisma.user.findUniqueOrThrow({
            where: {
                vk_id: vk_id
            },
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
    }

    async updateInterests(vk_id: number, interests: UpdateUserInterests) {
        await prisma.userInterests.deleteMany({
            where: {
                userVk_id: vk_id
            }
        })
        await prisma.userInterests.createMany({
            data: interests.interests
        })
    }
}