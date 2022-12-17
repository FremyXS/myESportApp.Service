import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export class PetService {
    async getPets(){
        const a = await prisma.pet.findMany()

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
}