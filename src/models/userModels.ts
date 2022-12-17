import {Sex, Interest, UserAchievement, Pet} from "@prisma/client";

export type CreationUserData = {
    vk_id: number
    interests: number[]
    age: number
    description: string
    sex: Sex
    city: string
    pet: {
        pet_id: number
        pet_sex: Sex
        pet_name: string
        pet_age: number
    }
}
export type UserInfo = {
    description: string
    interests: Interest[]
    city: string
    my_sex: Sex
    my_age: number
    my_achievements: UserAchievement[]
    my_pet: {pet_sex: Sex, pet_name: string, pet_age: number, pet: Pet}
}