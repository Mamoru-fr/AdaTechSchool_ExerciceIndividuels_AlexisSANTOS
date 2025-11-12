import Database from 'better-sqlite3';
import path from 'path';
import {drizzle} from 'drizzle-orm/better-sqlite3';

// Use absolute path to the database file
const DB_SOURCE = path.join(process.cwd(), 'data', 'database.db');

// Create the actual database connection
const sqlite = new Database(DB_SOURCE);

// Wrap the connection with Drizzle ORM
const dbSQLite = drizzle(sqlite);

export {dbSQLite as db};