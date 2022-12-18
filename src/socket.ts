import * as http from "http";
import {PetService} from "./service/PetService";

export let socketGlobal;
export function RegisterSocket(server: http.Server) {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on("connection", (socket) => {
        socketGlobal = socket;
        socket.on("breedSearch", async (text: string, callback) => {
            const petService = new PetService();
            const pets = await petService.getPetSearch(text);
            callback(pets);
        })
    })
    return io;
}