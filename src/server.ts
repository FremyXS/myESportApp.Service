import express from "express";

import bodyParser from "body-parser";
import {RegisterRoutes} from "./routes";

import * as swaggerJson from "./swagger.json";
import * as swaggerUI from "swagger-ui-express";
import {RegisterSocket} from "./socket";
import cors from "cors";

const port = process.env.PORT || 3000;

const app = express();
app.set("port", port);

const http = require("http").Server(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}))

RegisterRoutes(app);
RegisterSocket(http);

// RegisterSocket(server);

app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

http.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
        console.log('server startup error: address already in use');
    } else {
        console.log(err);
    }
});