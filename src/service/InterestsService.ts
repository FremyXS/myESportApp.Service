import {Interest, PrismaClient, User} from '@prisma/client'
import {CreationUserData} from '../models/userModels'

const prisma = new PrismaClient()

class InterestsService {
    async getInterests() {
        return await prisma.interest.findMany()
    }

    async selectMatching(vk_id: number) {
        const my_interests = await prisma.user.findUnique({
            where: {vk_id: vk_id},
            select: {interests: true}
        })
        const users_int = await prisma.user.findMany({
            where: {
                NOT: {
                    vk_id: vk_id
                }
            },
            select: {
                vk_id: true,
                interests: true
            }
        })
        const users_matching = users_int.map(e => {
            return {
                interests: e.interests,
                vk_id: e.vk_id,
                matching: my_interests.interests.filter(s => e.interests.includes(s)).length
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