/// <reference types="vite/client" />
import "reflect-metadata";
import express from "express";
import {Request, Response} from "express";
import {container} from "./src/container";
import IpController from "./src/FooController";
import HttpContext from "./src/HttpContext";

const app = express();


function controller(clazz: any, method: any) {
    return async (req: Request, res: Response) => {
        const resolver = container.createResolver();
        resolver.bindValue("request", req)
        resolver.bindValue("response", res)
        const instance = await resolver.make(clazz)
        await resolver.call(instance, method)
    }
}

app.use((req, res, next) => {
    new HttpContext(req, res).bind(req);
    next();
});

app.use((req, res, next) => {
    const context = HttpContext.resolve(req)

    if (context) {
        context.ip = req.ip || "";
    }

    next();
});

app.get(
    "/",
    controller(IpController, "index"),
);

export default app
