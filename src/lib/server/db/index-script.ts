import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema.js';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = createClient({ url: DATABASE_URL });

export const db = drizzle(client, { schema });
