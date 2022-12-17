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
    await prisma.achievement.createMany({
        data: [
            {
                title: 'Самая длинная кличка',
                description: "Выдается за самую длинную кличку среди всех пользователей приложения!",
            },
            {
                title: 'Дружелюбный',
                description: "У вас больше 50 взаимностей, поздравляем!",
            }
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