import { Hono } from "hono";
import { authRoutes } from "./routes/auth";

const app = new Hono().basePath("/api").route("/auth", authRoutes);

export default app;
