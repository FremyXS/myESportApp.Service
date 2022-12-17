import {Controller, Get, Path, Response, Route, SuccessResponse, Tags} from "tsoa";
import {IResponse} from "../models/responseModel";
import {InterestsService} from "../service/InterestsService";

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

    @Get("{vk_id}")
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
}