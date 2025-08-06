import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config();

const PG_URI = process.env.LOCAL_PG_URI;
const pool = new Pool({ connectionString: PG_URI });

export default {
  query: (text, params, callback) => {
    console.log('📋 executed query', text);
    return pool.query(text, params, callback);
  },
};
