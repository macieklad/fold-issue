import {inject} from "@adonisjs/fold";
import HttpContext from "./HttpContext";

export default class ExampleController {
    @inject()
    async index({ json, ip, url }: HttpContext) {
        json({ message: `Hello from ExampleController, your called from ip ${ip} and url ${url}` });
    }
}
