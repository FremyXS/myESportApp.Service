import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export class PetService {
    async getPets(){
        return await prisma.pet.findMany()
    }
}