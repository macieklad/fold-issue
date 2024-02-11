import {Container} from "@adonisjs/fold";
import HttpContext from "./HttpContext";
import {Request, Response} from "express";

interface ContainerTypes {
    request: Request;
    response: Response;
}

export const container = new Container<ContainerTypes>();

container.bind(HttpContext, async (resolver) => {
    const context = HttpContext.resolve(await resolver.make("request"));

    if (!context) {
        throw new Error("HttpContext must be resolved inside a request");
    }

    return context;
})
