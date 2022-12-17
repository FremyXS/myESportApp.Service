import * as http from "http";

export function RegisterSocket(server: http.Server) {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    io.on("connection", (socket: any) => {
        console.log(`${socket.id} connected to server`)
    })
    return io;
}