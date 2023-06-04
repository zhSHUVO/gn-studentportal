import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { errorLogger, infoLogger } from "./general/logger";

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        app.listen(config.port, () => {
            infoLogger.info(
                `---->Server is listening on port ${config.port}<----`
            );
        });
        infoLogger.info("---->Database connected<----");
    } catch (error) {
        errorLogger.error(`---->Database connection error, ${error}<----`);
    }
}

main();
