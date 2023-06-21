import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, "..", "..", "..", "vars", ".env");

dotenv.config({ path: envPath });

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAPI_API_KEY,
});
const openaiApp = new OpenAIApi(configuration);

export { openaiApp };
