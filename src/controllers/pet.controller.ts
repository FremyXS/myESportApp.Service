import {Controller, Get, Path, Response, Route, SuccessResponse, Tags} from "tsoa";
import {IResponse} from "../models/responseModel";
import {PetService} from "../service/PetService";

@Route('/pets')
export class PetController extends Controller {
    @Get("/all")
    @Tags("Pets")
    // @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getAllPets(): Promise<IResponse> {
        try {
            const petService = new PetService();
            const pets = await petService.getPets();
            const response = {
                message: "OK",
                status: "200",
                data: pets
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
    @Tags("Pets")
    // @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getPetsUser(@Path() vk_id: number): Promise<IResponse> {
        try {
            const petService = new PetService();
            const pets = await petService.getUserPet(vk_id);
            const response = {
                message: "OK",
                status: "200",
                data: pets
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
    @Tags("Pets")
    // @Security("jwt")
    @Response<IResponse>('400', 'Bad Request')
    @SuccessResponse<IResponse>('200', 'OK')
    public async getMatchingPet(@Path() vk_id: number): Promise<IResponse> {
        try {
            const petService = new PetService();
            const pets = await petService.petMatching(vk_id);
            const response = {
                message: "OK",
                status: "200",
                data: pets
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