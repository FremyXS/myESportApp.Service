import {PrismaClient, User} from '@prisma/client'
import {CreationUserData} from '../models/userModels'
import {AddedAchievementRequest} from "../models/achievmentModel";

const prisma = new PrismaClient()

export class AchievmentService {
    // async longestPetName() {
    //     const pets = await prisma.userPet.findMany({
    //         select: {
    //             pet_name: true,
    //             userVk_id: true
    //         }
    //     })
    //     const lengths = pets.map(e => {
    //         return {
    //             name_length: e.pet_name.length,
    //             vk_id: e.userVk_id
    //         }
    //     })
    //     let max_name = 0
    //     for (const pet of lengths) {
    //         if (max_name < pet.name_length)
    //             max_name = pet.name_length
    //     }
    //     const max_names = lengths.filter(e => e.name_length === max_name)
    //     //TODO: сообщение добавлена новая ачивка
    //     // const users = await prisma.user.findMany({
    //     //     where: max_names.map(e => {
    //     //         return {}
    //     //     })
    //     // })
    // }

    async addAchievment(data: AddedAchievementRequest) {
        const user_ach = await prisma.user.findUnique({
            where: {
                vk_id: data.vk_id
            },
            select: {
                my_achievements: true
            }
        })

        await prisma.user.update({
            where: {
                vk_id: data.vk_id
            },
            data: {
                my_achievements: {
                    set: {

                    }
                }
            }
        })
    }
}