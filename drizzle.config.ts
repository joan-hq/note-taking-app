import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// 这一行非常关键，它让 Drizzle 能看懂 .env.local
dotenv.config({ path: '.env.local' });

console.log('DB_URL Check:', process.env.DATABASE_URL ? 'Loaded ✅' : 'Missing ❌');

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, 
  },
});