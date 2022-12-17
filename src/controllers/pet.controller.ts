import {Controller, Get, Path, Response, Route, SuccessResponse, Tags} from "tsoa";
import {IResponse} from "../models/responseModel";
import {UserService} from "../service/UserService";

@Route('/pets')
export class PetController extends Controller {
    // @Get("/all")
    // @Tags("Pets")
    // // @Security("jwt")
    // @Response<IResponse>('400', 'Bad Request')
    // @SuccessResponse<IResponse>('200', 'OK')
    // public async getAllPets(): Promise<IResponse> {
    //     try {
    //         const petService = new PetService();
    //         const user = await userService.getUserProfile({vk_id});
    //         if (!user) throw new Error("Пользователя с таким vk_id не существует");
    //         const response = {
    //             message: "OK",
    //             status: "200",
    //             data: user
    //         }
    //         return response;
    //     } catch (err) {
    //         this.setStatus(400);
    //         const response = {
    //             message: "FAIL",
    //             status: "400",
    //             data: err.message
    //         }
    //         return response
    //     }
    // }
}