import {Body, Controller, Get, Post, Response, Route, SuccessResponse, Tags, Security, Path} from "tsoa";
import {IResponse} from "../models/responseModel";

@Route('/user')
export class UserController extends Controller {
    @Post("/login")
    @Tags("Users")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async authUser(@Body() body: IRequestUser): Promise<IResponse> {
        try {

            const response = {
                message: "OK",
                status: "200",
                data: body
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

    @Post("/register")
    @Tags("Users")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async registerUser(@Body() body: IRequestUser): Promise<IResponse> {
        try {

            const response = {
                message: "OK",
                status: "200",
                data: body
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
    @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getUserID(@Path() vk_id: number): Promise<IResponse> {
        try {
            // const apply = new ApplyService();
            // await apply.get(apply_id);
            const response = {
                message: "OK",
                status: "200",
                data: vk_id
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
}