import * as io from "socket.io";
import http from "http";

export function RegisterSocket(server: http.Server) {
    io(server).on('connection', (client) => {
        console.log('Connected with socket: ' + client.id)
        client.on('search-breed', (text) => {
            client.emit('search-breed-found', text)
        })
        client.on('disconnect', () => {
            console.log('Disconnected with socket: ' + client.id)
        })
    })
}