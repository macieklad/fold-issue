import {inject} from "@adonisjs/fold";
import HttpContext from "./HttpContext";

export default class ExampleController {
    @inject()
    async index(context: HttpContext) {
        context.response.json({ message: `Hello from FooController, your ip is ${context.ip}` });
    }
}
