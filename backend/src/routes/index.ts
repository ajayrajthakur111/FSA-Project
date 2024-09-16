import { Router } from "express";
import { blogRoute } from "./blogRoutes";
import { authRoute } from "./authRoutes";

export const indexRouter = Router();

indexRouter.use("/blogs", blogRoute);
indexRouter.use("/auth", authRoute);
