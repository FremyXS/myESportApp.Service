import {PrismaClient, Sex} from '@prisma/client'

const prisma = new PrismaClient()
import {UserService} from '../service/UserService'
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
    const a = new UserService()
    await a.createUserProfile({
        pet: {
            pet_breed_id: 4,
            pet_age: 20,
            pet_sex: Sex.secret,
            pet_name: "Боба"
        },
        vk_id: 1,
        description: "дима",
        city: "копейск",
        sex: Sex.male,
        age: 10,
        interests: [
            1, 2, 3, 6
        ]
    })

    await a.createUserProfile({
        pet: {
            pet_breed_id: 4,
            pet_age: 10,
            pet_sex: Sex.male,
            pet_name: "Биба"
        },
        vk_id: 2,
        description: "петя",
        city: "челяба",
        sex: Sex.male,
        age: 11,
        interests: [
            3, 6
        ]
    })

    await a.createUserProfile({
        pet: {
            pet_breed_id: 4,
            pet_age: 10,
            pet_sex: Sex.male,
            pet_name: "Все у меня совпадают"
        },
        vk_id: 5,
        description: "я мужик",
        city: "москва",
        sex: Sex.female,
        age: 41,
        interests: [
            1, 2, 3, 6
        ]
    })


    await a.createUserProfile({
        pet: {
            pet_breed_id: 4,
            pet_age: 10,
            pet_sex: Sex.male,
            pet_name: "Бобик"
        },
        vk_id: 3,
        description: "зоя",
        city: "копейск",
        sex: Sex.female,
        age: 14,
        interests: [
             6
        ]
    })

    await a.createUserProfile({
        pet: {
            pet_breed_id: 5,
            pet_age: 1,
            pet_sex: Sex.secret,
            pet_name: "Собака"
        },
        vk_id: 4,
        description: "костя",
        city: "копейск",
        sex: Sex.male,
        age: 1,
        interests: [
            1, 2, 3
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