import {defineConfig} from "vite";
import {vavite} from "vavite";
import swc from "vite-plugin-swc-transform";

export default defineConfig({
    plugins: [
        swc({
            swcOptions: {
                jsc: {
                    target: "es2022",
                    transform: {
                        legacyDecorator: true,
                        decoratorMetadata: true,
                        useDefineForClassFields: false,
                    },
                },
            },
        }),
        vavite({
            handlerEntry: "/server.ts",
            reloadOn: "static-deps-change",
            serveClientAssetsInDev: true,
        }),
    ],
});
