import {PrismaClient, Apply} from '@prisma/client'
const prisma = new PrismaClient()

class ApplyService {
    async create(data): Promise<void> {
        await prisma.T.create//...
    }

    async get(apply_id: number): Promise<Apply> {
        return await prisma.T.findUnique({
            where: {apply_id: apply_id}
        })
    }
}

export default new ApplyService()