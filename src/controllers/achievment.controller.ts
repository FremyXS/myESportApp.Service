import {Body, Controller, Post, Response, Route, SuccessResponse, Tags} from "tsoa";
import {IResponse} from "../models/responseModel";
import {AddedAchievementRequest} from "../models/achievmentModel";
import {AchievmentService} from "../service/AchievmentService";

@Route('/achievment')
export class InterestsController extends Controller {
    @Post("")
    @Tags("Achievments")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async addAchievementsUser(@Body() body: AddedAchievementRequest): Promise<IResponse> {
        try {
            const achievementService = new AchievmentService();
            const achievement = await achievementService.addAchievment(body);
            const response = {
                message: "OK",
                status: "200",
                data: "Ачивки пользователю добавлены"
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