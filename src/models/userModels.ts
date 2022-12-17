import {Sex} from "@prisma/client";

export type CreationUserData = {
    vk_id: number
    interests: number[]
    age: number
    description: string
    sex: Sex
    city: string
    pets: {
        pet_id: number
        pet_sex: Sex
        pet_name:  string
        pet_age:   number
    } []
}