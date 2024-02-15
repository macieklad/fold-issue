import {Container} from "@adonisjs/fold";
import HttpContext from "./HttpContext";
import {Request, Response, NextFunction} from "express";

interface ContainerTypes {
    request: Request;
    response: Response;
}

export const container = new Container<ContainerTypes>();

container.bind(HttpContext, async (resolver) => {
    const context = HttpContext.resolve(await resolver.make("request"));

    if (!context) {
        throw new Error("HttpContext must be resolved inside a request handler");
    }

    return context;
})

export function controller(clazz: any, method: any) {
    return async (req: Request, res: Response) => {
        const resolver = container.createResolver();
        resolver.bindValue("request", req)
        resolver.bindValue("response", res)
        const instance = await resolver.make(clazz)
        await resolver.call(instance, method)
    }
}

export function bindHttpContextMiddleware(req: Request, res: Response, next: NextFunction) {
    new HttpContext(req, res).bind(req);
    next();
}
