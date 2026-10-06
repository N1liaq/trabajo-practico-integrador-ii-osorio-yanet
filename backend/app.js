import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
import { tagRouter } from "./src/routes/tag.routes.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { articleTagRouter } from "./src/routes/article.tag.routes.js";
import { articleRouter } from "./src/routes/article.routes.js";
import cookieParser from "cookie-parser";

config();
const app = express();
const portDB = process.env.PORTDB;
const origin = process.env.ORIGIN;

app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", tagRouter);
app.use("/api/auth", authRouter);
app.use("/api", articleTagRouter);
app.use("/api", articleRouter);
app.use(
  cors({
    origin: origin,
    credentials: true,
  }),
);

app.listen(portDB, async () => {
  await startDB();
  console.log("servidor encendido");
});
