import {PrismaClient} from '@prisma/client'
import {CreationUserData, UpdateUserInfo, UpdateUserInterests} from '../models/userModels'

const prisma = new PrismaClient()

export class UserService {
    async createUserProfile(data: CreationUserData) {

        await prisma.user.create({
            data: {
                vk_id: data.vk_id,
                my_age: data.age,
                my_sex: data.sex,
                description: data.description,
                my_pet: {
                    create: {
                        petPet_id: data.pet.pet_breed_id,
                        pet_age: data.pet.pet_age,
                        pet_sex: data.pet.pet_sex,
                        pet_name: data.pet.pet_name
                    }
                },
                city: data.city
            }
        })
        await prisma.userInterests.createMany({
            data: data.interests.map(e => {
                return {
                    userVk_id: data.vk_id,
                    interestId: e
                }
            })
        })
    }

    async getUserProfile(data: { vk_id: number }): Promise<any> {
        return await prisma.user.findUniqueOrThrow({
            where: {
                vk_id: data.vk_id
            },
            select: {
                city: true,
                my_pet: {
                    select: {
                        pet: true,
                        pet_sex: true,
                        pet_name: true,
                        pet_age: true
                    }
                },
                my_age: true,
                description: true,
                my_sex: true,
            }
        })
    }

    async updateUserData(vk_id: number, data: UpdateUserInfo) {
        await prisma.user.update({
            where: {vk_id: vk_id},
            data: data
        })
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

    async getUserPet(vk_id: number) {
        await prisma.user.findUnique({
            where: {
                vk_id: vk_id
            },
            select: {
                my_pet: {
                    select: {
                        pet_name: true,
                        pet_sex: true,
                        pet_age: true,
                        pet: {
                            select: {
                                image: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })
    }
}