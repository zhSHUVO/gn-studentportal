import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, infoLogger } from "./general/logger";

process.on("uncaughtException", error => {
    errorLogger.error(error);
    process.exit(1);
});

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        server = app.listen(config.port, () => {
            infoLogger.info(
                `---->Server is listening on port ${config.port}<----`
            );
        });
        infoLogger.info("---->Database connected<----");
    } catch (error) {
        errorLogger.error(`---->Database connection error, ${error}<----`);
    }

    process.on("unhandledRejection", error => {
        console.log("unhandled rejection detected. closing server");
        if (server) {
            server.close(() => errorLogger.error(error));
            process.exit(1);
        } else {
            process.exit(1);
        }
    });
}

main();

process.on("SIGTERM", () => {
    infoLogger.info("SIGTERN is received");
    if (server) {
        server.close();
    }
});
