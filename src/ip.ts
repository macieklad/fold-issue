import {Request, Response, NextFunction} from "express";
import HttpContext from "./HttpContext";

export function ipMiddleware(req: Request, res: Response, next: NextFunction) {
    const context = HttpContext.resolve(req)

    if (context) {
        context.ip = req.ip || "";
    }

    next();
}
