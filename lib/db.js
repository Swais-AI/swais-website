import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'swais-db-hyd.cri2kcc26kxg.ap-south-2.rds.amazonaws.com',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sgs_prod',
  user: process.env.DB_USER || 'swais_app_user',
  password: process.env.DB_PASSWORD || 'Swaisuser007',
  ssl: { rejectUnauthorized: false }
});

export default pool;
