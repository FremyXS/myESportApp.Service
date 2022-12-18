import {Body, Controller, Get, Path, Post, Response, Route, SuccessResponse, Tags} from "tsoa";
import {IResponse} from "../models/responseModel";
import {LikesService} from "../service/LikesService";
import {DoLikesRequest} from "../models/likesModel";

@Route('/likes')
export class LikesController extends Controller {

    @Post("")
    @Tags("Likes")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async doLikeUser(@Body() body: DoLikesRequest): Promise<IResponse> {
        try {
            const likesService = new LikesService();
            const likes = await likesService.doLike(body);
            const response = {
                message: "OK",
                status: "200",
                data: "Вы сделали свой выбор:)"
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
    @Tags("Likes")
    // @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getMyLikedUsers(@Path() vk_id: number): Promise<IResponse> {
        try {
            const likesService = new LikesService();
            const likes = await likesService.getMyLikedUsers(vk_id);
            const response = {
                message: "OK",
                status: "200",
                data: likes
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

    @Get("/to/{vk_id}")
    @Tags("Likes")
    // @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getUsersWhoLikedMe(@Path() vk_id: number): Promise<IResponse> {
        try {
            const likesService = new LikesService();
            const likes = await likesService.getUsersWhoLikedMe(vk_id);
            const response = {
                message: "OK",
                status: "200",
                data: likes
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

    @Get("/offline/{vk_id}")
    @Tags("Likes")
    // @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getOfflineAccept(@Path() vk_id: number): Promise<IResponse> {
        try {
            const likesService = new LikesService();
            const likes = await likesService.getUserAcceptStatus(vk_id);
            const response = {
                message: "OK",
                status: "200",
                data: likes
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