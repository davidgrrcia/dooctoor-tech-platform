import { type Config } from "drizzle-kit";

import { env } from "./env";

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["velvo_*"],
  casing: "snake_case",
} satisfies Config;
