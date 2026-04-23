
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import * as dotenv from 'dotenv';
//dotenv.config();
// 确保这里的环境变量名和你 .env.local 里的一致

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle(sql);



const connectionString = process.env.DATABASE_URL;

// 增加防御性检查，确保在连接前变量已加载
if (!connectionString) {
  // 如果这里报错，请检查根目录下的 .env.local 文件是否存在，以及变量名是否完全一致
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const sql = neon(connectionString);

// 导出 db 实例
export const db = drizzle(sql, { schema });

console.log("Current ENV keys:", Object.keys(process.env));