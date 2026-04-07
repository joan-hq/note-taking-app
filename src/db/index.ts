import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import * as dotenv from 'dotenv';
dotenv.config();
// 确保这里的环境变量名和你 .env.local 里的一致

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

// const connectionString = process.env.DATABASE_URL!;

// const client = neon(connectionString);
// export const db = drizzle(client, { schema });