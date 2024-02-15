import type { Request, Response } from "express";

export default class HttpContext {
    static __references = new WeakMap<Request, HttpContext>();

    constructor(public request: Request, public response: Response, public ip: string = "") {
    }

    static resolve(req: Request) {
        return HttpContext.__references.get(req);
    }

    bind(req: Request) {
        HttpContext.__references.set(req, this);
    }
}
