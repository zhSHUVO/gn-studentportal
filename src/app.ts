import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRouter from "./app/modules/users/users.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users/", userRouter);

app.get("/", async (req: Request, res: Response) => {
    res.send("Server is Up");
});

export default app;
