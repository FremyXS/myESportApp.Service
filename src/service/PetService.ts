import {Pet, PrismaClient, Sex} from '@prisma/client'
import {UserService} from './UserService'
import {LikesService} from "./LikesService";
import {PetModel} from "../models/petModel";

const prisma = new PrismaClient()

export class PetService {
    async getPets() {
        return await prisma.pet.findMany();
    }

    async getPetSearch(text: string): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                name: {contains: text}
            }
        });
        return pets
    }

    async petMatching(vk_id: number) {
        const my_pet = await prisma.user.findUniqueOrThrow({
            where: {
                vk_id: vk_id
            },
            select: {
                my_pet: true
            }
        })
        const pet_id = my_pet.my_pet.petPet_id
        const users = await prisma.userPet.findMany({
            where: {
                AND: [
                    {
                        User: {
                            every: {
                                NOT: {vk_id: vk_id}
                            }
                        }
                    },
                    {
                        pet: {
                            pet_id: pet_id
                        }
                    }
                ]
            },
            select: {
                User: true
            }
        })

        const likesService = new LikesService();
        const likes_users = await likesService.getAllLikesMe(vk_id);

        const users_matching = [];
        users.forEach(e => {
            if (!likes_users.includes(e.User[0].vk_id)) users_matching.push({vk_id: e.User[0].vk_id})
        })

        const serv = new UserService()
        const response = [];
        for (const e of users_matching) {
            const user = await serv.getUserProfile(e);
            response.push(user)
        }
        return response;
    }

    async getUserPet(vk_id: number) {
        return await prisma.user.findUnique({
            where: {
                vk_id: vk_id
            },
            select: {
                my_pet: {
                    select: {
                        pet_name: true,
                        pet_sex: true,
                        pet_age: true,
                        pet: {
                            select: {
                                image: true,
                                name: true,
                                pet_id: true
                            }
                        }
                    }
                }
            }
        })
    }

    async updateUserPet(vk_id: number, pet: PetModel) {
        return await prisma.user.update({
            where: {vk_id: vk_id},
            data: {
                my_pet: {
                    create: {
                        pet_sex: pet.pet_sex,
                        pet_name: pet.pet_name,
                        petPet_id: pet.petPet_id,
                        pet_age: pet.pet_age
                    }
                }
            },
            select: {
                my_pet: true
            }
        })
    }

}