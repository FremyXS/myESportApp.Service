import {Status} from '@prisma/client'

export type DoLikesRequest = {
    my_vk_id: number;
    user_to_like: number;
    status: Status;
}