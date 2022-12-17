import {Body, Controller, Get, Post, Response, Route, SuccessResponse, Tags} from "tsoa";
import {IResponse} from "../models/responseModel";
import {ApplyModel} from "../models/applyModel";
import {IRequestUser} from "../models/userModel";

@Route('/user')
export class UserController extends Controller {
    @Post("")
    @Tags("Users")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse('200', 'OK')
    public async auth(@Body() body: IRequestUser): Promise<IResponse> {
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
}