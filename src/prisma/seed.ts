import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
import {dogs} from './dogs'
import {data} from "osmosis";

async function main() {

    await prisma.pet.createMany({
        data: dogs
    })
    await prisma.interest.createMany({
        data: [
            {title: 'Прогулки'},
            {title: 'Мода'},
            {title: 'Спорт'},
            {title: 'Уход за животными'},
            {title: 'Еще'},
            {title: 'ЫЫЫ'}
        ]
    })

    console.log('Stop seeding successfully!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })