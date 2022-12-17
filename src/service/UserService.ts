import {PrismaClient, User} from '@prisma/client'
import {CreationUserData, UserInfo} from '../models/userModels'

const prisma = new PrismaClient()

export class UserService {
    async createUserProfile(data: CreationUserData) {
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
                    createMany: {
                        data: data.pets.map(e => {
                                return {
                                    petPet_id: e.pet_id,
                                    pet_age: e.pet_age,
                                    pet_sex: e.pet_sex,
                                    pet_name: e.pet_name
                                }
                            }
                        )
                    }
                },
                city: data.city
            }
        })
    }

    async getUserProfile(data: { vk_id: number }): Promise<UserInfo> {
        return  await prisma.user.findUniqueOrThrow({
            where: {
                vk_id: data.vk_id
            },
            select: {
                interests: true,
                city: true,
                my_pets: true,
                my_age: true,
                description: true,
                my_sex: true,
                my_achievements: true
            }
        })

    }
}