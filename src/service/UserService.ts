import {Sex, PrismaClient, UserPet, User} from '@prisma/client'

const prisma = new PrismaClient()

export class UserService {
    async createUserProfile(data: { vk_id: number, interests: string[], age: number, description: string, sex: Sex, city: string, pets: string[] }) {
        await prisma.user.create({
            data: {
                vk_id: data.vk_id,
                interests: {
                    connect: data.interests.map(e => {
                        return {
                            id: e
                        }
                    })
                },
                my_achievements: {},
                my_age: data.age,
                my_sex: data.sex,
                description: data.description,
                my_pets: {
                    connect: data.pets.map(e => {
                        return {
                            id: e
                        }
                    })
                },
                city: data.city
            }
        })
    }

    async getUserProfile(data: { vk_id: number }): Promise<User> {
        return await prisma.user.findUnique({
            where: {
                vk_id: data.vk_id
            }
        })
    }
}