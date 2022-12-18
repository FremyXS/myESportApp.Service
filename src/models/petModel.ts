import {Sex} from "@prisma/client"

export type PetModel = {
    petPet_id: number,
    pet_age: number,
    pet_sex: Sex,
    pet_name: string
}