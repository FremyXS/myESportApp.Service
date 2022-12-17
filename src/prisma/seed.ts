import {PrismaClient} from '@prisma/client'
import {Breed} from "../scripts/breed.scripts";
const prisma = new PrismaClient()


async function main() {
    const bt = new Breed();
    const res = await bt.getDogs();
    await prisma.pet.createMany({
        data: res
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