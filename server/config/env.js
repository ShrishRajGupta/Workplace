// Loads server/.env (regardless of the current working directory) and exposes typed config.
// Import this module FIRST in index.js: ESM evaluates imports before the importing module's
// body, so any module that reads process.env at import time must come after this one.
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", ".env") });

const REQUIRED = ["MONGO_URL", "ACCESS_TOKEN"];
const OPTIONAL_FEATURES = {
  "photo upload": ["CLOUDINARY_CLOUDNAME", "CLOUDINARY_APIKEY", "CLOUDINARY_APISECRET"],
  "email": ["GMAIL_USER", "GMAIL_PASS"],
};

// Throws when a required variable is missing; warns when an optional feature is unconfigured.
export const assertEnv = () => {
  const missing = REQUIRED.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")} (see server/.env.example)`);
  }
  for (const [feature, keys] of Object.entries(OPTIONAL_FEATURES)) {
    const absent = keys.filter((key) => !process.env[key]);
    if (absent.length) console.warn(`[env] ${feature} disabled: missing ${absent.join(", ")}`);
  }
};

export const env = {
  port: Number(process.env.PORT) || 3001,
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.ACCESS_TOKEN,
  isProduction: process.env.NODE_ENV === "production",
};
