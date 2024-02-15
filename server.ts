/// <reference types="vite/client" />
import "reflect-metadata";
import express from "express";
import {bindHttpContextMiddleware, controller} from "./src/container";
import ExampleController from "./src/ExampleController";
import {ipMiddleware} from "./src/ip";

const app = express()

app.use(bindHttpContextMiddleware);
app.use(ipMiddleware);

app.get(
    "/",
    controller(ExampleController, "index"),
);

export default app
