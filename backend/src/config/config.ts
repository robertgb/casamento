import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../../generated/prisma/client.ts";

interface Config {
  port: number;
  nodeEnv: string;
  databaseURL: string;
  corsOrigin: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseURL:
    process.env.DATABASE_URL ||
    "postgres://d2570495de363aa7b2068e2c74d9e4dd1cce2722f966d7496f06bb6dd802013c:sk_pL0qO5nMqaRiSiulUVewI@db.prisma.io:5432/postgres?sslmode=require",
  corsOrigin: process.env.CORS_ORIGIN || "*",
};

const adapter = new PrismaPg({
  connectionString: config.databaseURL,
});

export const prisma = new PrismaClient({ adapter });

export default config;
