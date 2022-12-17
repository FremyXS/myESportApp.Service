import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
    await prisma.pet.createMany({
        data: [
            {name: 'Антон'},
            {name: 'Кеша'},
            {name: 'Слава'}
        ]
    })
    await prisma.interest.createMany({
        data: [
            {title: 'Футбол'},
            {title: 'Питон'},
            {title: 'Антон'},
            {title: 'Спорт'}
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