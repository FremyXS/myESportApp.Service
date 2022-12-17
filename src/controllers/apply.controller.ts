// import {ApplyService} from "../service/applyService";
import {Controller, Response, Post, Tags, Route, SuccessResponse, Body, Get, Path, Security} from "tsoa";
import {IResponse} from "../models/responseModel";
import {ApplyModel} from "../models/applyModel";

@Route('/apply')
export class ApplyController extends Controller {
    @Post()
    @Tags("Apply")Security
    @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse('200', 'OK')
    public async create(@Body() body: ApplyModel): Promise<IResponse> {
        try {
            // const apply = new ApplyService();
            // await apply.create(body);
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

    @Get("{apply_id}")
    @Tags("Apply")
    public async get(@Path() apply_id: string): Promise<IResponse> {
        try {
            // const apply = new ApplyService();
            // await apply.get(apply_id);
            const response = {
                message: "OK",
                status: "200",
                data: apply_id
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