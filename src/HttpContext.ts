import type { Request, Response } from "express";

export default class HttpContext {
    static __references = new WeakMap<Request, HttpContext>();

    constructor(protected request: Request, protected response: Response, public ip: string = "") {
    }

    get url() {
        return this.request.url;
    }

    status = (code: number) => {
        this.response.status(code);
    }

    json = (obj: Record<string, unknown>) => {
        this.response.json(obj);
    }

    headers = (init: Record<string, string>) => {
        for (const key in init) {
            this.response.header(key, init[key]);
        }
    }



    static resolve(req: Request) {
        return HttpContext.__references.get(req);
    }

    bind(req: Request) {
        HttpContext.__references.set(req, this);
    }
}
