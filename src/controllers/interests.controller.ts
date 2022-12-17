import {Body, Controller, Get, Path, Put, Response, Route, SuccessResponse, Tags} from "tsoa";
import {IResponse} from "../models/responseModel";
import {InterestsService} from "../service/InterestsService";
import {UpdateUserInfo} from "../models/userModels";
import {UserService} from "../service/UserService";
import {UpdateUserInterests} from "../models/interestsModel";

@Route('/interests')
export class InterestsController extends Controller {
    @Get("/all")
    @Tags("Interests")
    // @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getAllInterests(): Promise<IResponse> {
        try {
            const interestsService = new InterestsService();
            const interests = await interestsService.getInterests();
            if (!interests) throw new Error("В базе данных отсуствуют интересы");
            const response = {
                message: "OK",
                status: "200",
                data: interests
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

    @Get("/matching/{vk_id}")
    @Tags("Interests")
    // @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getMatchingInterests(@Path() vk_id: number): Promise<IResponse> {
        try {
            const interestsService = new InterestsService();
            const interests = await interestsService.selectMatching(vk_id);
            const response = {
                message: "OK",
                status: "200",
                data: interests
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

    @Get("/{vk_id}")
    @Tags("Interests")
    // @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getInterestsUser(@Path() vk_id: number): Promise<IResponse> {
        try {
            const interestsService = new InterestsService();
            const interests = await interestsService.getUserInterests(vk_id);
            const response = {
                message: "OK",
                status: "200",
                data: interests
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

    @Put("{vk_id}")
    @Tags("Interests")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async updateInterestsUser(@Path() vk_id: number, @Body() body: UpdateUserInterests): Promise<IResponse> {
        try {
            const interestsService = new InterestsService();
            const interests = await interestsService.updateInterests(vk_id, body);
            const response = {
                message: "OK",
                status: "200",
                data: "Интересы обновлены"
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