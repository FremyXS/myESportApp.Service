import {PrismaClient} from '@prisma/client'
import {UserService} from './UserService'

const prisma = new PrismaClient()

export class PetService {
    async getPets() {
        return await prisma.pet.findMany();
    }

    async petMatching(vk_id: number) {
        const my_pet = await prisma.user.findUniqueOrThrow({
            where: {
                vk_id: vk_id
            },
            select: {
                my_pet: true
            }
        })
        const pet_id = my_pet.my_pet.petPet_id
        const users = await prisma.userPet.findMany({
            where: {
                AND: [
                    {
                        User: {
                            every: {
                                NOT: {vk_id: vk_id}
                            }
                        }
                    },
                    {
                        pet: {
                            pet_id: pet_id
                        }
                    }
                ]
            },
            select: {
                User: true
            }
        })
        const serv = new UserService()
        return users.map(async e => await serv.getUserProfile({vk_id: e.User[0].vk_id}))
    }

    async getUserPet(vk_id: number) {
        return await prisma.user.findUnique({
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
                                name: true,
                                pet_id: true
                            }
                        }
                    }
                }
            }
        })
    }
}