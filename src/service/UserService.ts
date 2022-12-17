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
                my_pet: {
                    create: {
                        petPet_id: data.pet.pet_id,
                        pet_age: data.pet.pet_age,
                        pet_sex: data.pet.pet_sex,
                        pet_name: data.pet.pet_name
                    }
                },
                city: data.city
            }
        })
    }

    async getUserProfile(data: { vk_id: number }): Promise<any> {
        const a =  await prisma.user.findUniqueOrThrow({
            where: {
                vk_id: data.vk_id
            },
            select: {
                interests: true,
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
                my_achievements: true
            }
        })
    }
}