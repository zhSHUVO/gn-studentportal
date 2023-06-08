import cors from "cors";
import express, { Application } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { UserRoutes } from "./app/modules/users/user.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users/", UserRoutes.router);

// test api
// app.get("/", async (req: Request, res: Response, next: NextFunction) => {
//     throw new Error("testing new error");
// });

app.use(globalErrorHandler);

export default app;
