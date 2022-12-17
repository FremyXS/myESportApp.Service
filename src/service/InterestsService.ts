import {PrismaClient, User} from '@prisma/client'
import {CreationUserData} from '../models/userModels'

const prisma = new PrismaClient()

class InterestsService {
    async getInterests() {
        return await prisma.interest.findMany()
    }
    async selectMatching(vk_id: number) {
        const my_interests = await prisma.user.findUnique({
            where:{vk_id: vk_id},
            select: {interests: true}
        })
        return await prisma.user.findMany({
            where: {
                NOT: {
                    vk_id: vk_id
                }
            },
            select: {

            }
        })
    }
}