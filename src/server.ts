import express from "express";
import * as http from "http";

import bodyParser from "body-parser";
import {RegisterRoutes} from "./routes";

import * as swaggerJson from "./swagger.json";
import * as swaggerUI from "swagger-ui-express";
// import {RegisterSocket} from "./socket";

const app = express();
// const server: http.Server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

RegisterRoutes(app);
// RegisterSocket(server);

app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
).on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
        console.log('server startup error: address already in use');
    } else {
        console.log(err);
    }
});