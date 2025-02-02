import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import router from "./app/routes";

const app: Application = express();
app.use(cors());
app.use(cookieParser());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("LF-System!");
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  // console.log(req)
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api not fount!",
    error: {
      path: req.originalUrl,
      message: "Your request api is not found!",
    },
  });
});

export default app;
