import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
const dogs = require('dogs.json')


async function main() {

    await prisma.pet.createMany({
        data: [
            {name: 'Антон', image: "1"},
            {name: 'Кеша', image: "1"},
            {name: 'Слава', image: "1"}
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