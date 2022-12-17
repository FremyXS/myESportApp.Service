import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export class PetService {
    async getPets(){
        const a = await prisma.pet.findMany();
        return a;
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
                petPet_id: pet_id
            },
            select: {
                User: true
            }
        })
        return users.map(e => e.User)
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
                                name: true
                            }
                        }
                    }
                }
            }
        })
    }
}