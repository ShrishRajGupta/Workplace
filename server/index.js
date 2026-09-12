import { assertEnv, env } from "./config/env.js"; // must stay the first import (loads .env)
import connectDB from "./config/conn.js";
import app from "./app.js";

process.on("unhandledRejection", (reason) => {
  console.error("[fatal] unhandled promise rejection:", reason);
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.error("[fatal] uncaught exception:", err);
  process.exit(1);
});

try {
  assertEnv();
  await connectDB(env.mongoUrl);
} catch (err) {
  console.error(`[fatal] ${err.message}`);
  process.exit(1);
}

app.listen(env.port, () => {
  console.log(`Server is now running on http://localhost:${env.port}`);
});
