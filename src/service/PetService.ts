import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export class PetService {
    async getPets(){
        const a = await prisma.pet.findMany()

    }

    async petMatching(vk_id: number) {

    }
}