import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as process from "process";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
): Promise<any> {
    if (securityName === "jwt") {
        const token =
            request.body.token ||
            request.query.token ||
            request.headers["x-access-token"];

        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            }
            jwt.verify(token, process.env.SECRET_KEY, function (err: any, decoded: any) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}