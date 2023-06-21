import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, "..", "..", "..", "vars", ".env");

dotenv.config({ path: envPath });

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "./routes/assessmentRoutes.mjs";
import {
  sendInvalidRouteError,
  sendNoParametersSentError,
} from "./middlewares/errorHandler.mjs";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/assessment", router);

app.use(sendInvalidRouteError);
app.use(sendNoParametersSentError);

const port = process.env.ASSESSMENT_API_PORT || 7001;

app.listen(port, () => {
  console.log(`assessment server is listening on port ${port}`);
});
