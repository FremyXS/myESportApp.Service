// import {Apply, PrismaClient} from '@prisma/client'
//
// const prisma = new PrismaClient()
//
// export class ApplyService {
//     async create(data): Promise<void> {
//         await prisma.apply.create(data)
//     }
//
//     async get(apply_id: string): Promise<Apply> {
//         const apply = await prisma.apply.findUnique({
//             where: {
//                 apply_id: apply_id
//             }
//         })
//         return apply
//     }
//
//     async delete(apply_id: string): Promise<void> {
//         await prisma.apply.delete({
//             where: {
//                 apply_id: apply_id
//             }
//         })
//     }
//
//     // update data
//     async changeDescription(apply_id: string, description: string): Promise<void> {
//         await prisma.apply.update({
//             where: {
//                 apply_id: apply_id
//             },
//             data: {
//                 description: description
//             }
//         })
//     }
//
//     async addRequestToApply(apply_id: string, toMyTeam: boolean, vk_id: number): Promise<void> {
//         const apply = await prisma.apply.findUnique({where: {apply_id: apply_id}})
//         toMyTeam ?
//             await prisma.apply.update({
//                 where: {
//                     apply_id: apply_id
//                 },
//                 data: {
//                     join_my_team_requests_vk_ids: [...apply.join_my_team_requests_vk_ids, vk_id]
//                 }
//             })
//             :
//             await prisma.apply.update({
//                 where: {
//                     apply_id: apply_id
//                 },
//                 data: {
//                     join_enemies_requests_vk_ids: [...apply.join_enemies_requests_vk_ids, vk_id]
//                 }
//             })
//     }
//     async acceptRequest(apply_id: string, vk_id: number) {
//         const apply = await prisma.apply.findUnique({where: {apply_id: apply_id}})
//
//     }
//
// }