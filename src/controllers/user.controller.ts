import {Body, Controller, Get, Post, Response, Route, SuccessResponse, Tags, Security, Path} from "tsoa";
import {IResponse} from "../models/responseModel";
import {UserService} from "../service/UserService";
import {CreationUserData} from "../models/userModels";

@Route('/user')
export class UserController extends Controller {
    // @Post("/login")
    // @Tags("Users")
    // @Response<IResponse>('400', 'Bad Request')
    // @SuccessResponse<IResponse>('200', 'OK')
    // public async authUser(@Body() body: IRequestUser): Promise<IResponse> {
    //     try {
    //
    //         const response = {
    //             message: "OK",
    //             status: "200",
    //             data: body
    //         }
    //         return response;
    //     } catch (err) {
    //         this.setStatus(400);
    //         const response = {
    //             message: "FAIL",
    //             status: "400",
    //             data: err
    //         }
    //         return response
    //     }
    // }
    //
    @Post("/register")
    @Tags("Users")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async registerUser(@Body() body: CreationUserData): Promise<IResponse> {
        try {
            const userService = new UserService();
            const user = await userService.createUserProfile(body);
            const response = {
                message: "OK",
                status: "200",
                data: "Пользователь успешно добавлен"
            }
            return response;
        } catch (err) {
            this.setStatus(400);
            const response = {
                message: "FAIL",
                status: "400",
                data: err
            }
            return response
        }
    }

    @Get("{vk_id}")
    @Tags("Users")
    // @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getUserID(@Path() vk_id: number): Promise<IResponse> {
        try {
            const userService = new UserService();
            const user = await userService.getUserProfile({vk_id});
            if (!user) throw new Error("Пользователя с таким vk_id не существует");
            const response = {
                message: "OK",
                status: "200",
                data: user
            }
            return response;
        } catch (err) {
            this.setStatus(400);
            const response = {
                message: "FAIL",
                status: "400",
                data: err.message
            }
            return response
        }
    }
}