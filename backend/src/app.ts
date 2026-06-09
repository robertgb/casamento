import cors from "cors";
import express from "express";

import config from "./config/config.ts";
import { errorHandler } from "./middlewares/errorHandler.ts";
import routes from "./routes/routes.ts";

const app = express();

// Para permitir CORS
app.use(cors({ origin: config.corsOrigin }));

// Para entender JSON
app.use(express.json());

// Para entender formulários HTML
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api", routes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
