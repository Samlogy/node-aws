const { Pool } = require('pg');
require('dotenv').config();

const options = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};
console.log('db => ', options);
const pool = new Pool(options);

// Test the connection (optional)
// pool.connect()
//   .then(() => console.log('Connected to PostgreSQL database'))
//   .catch(err => console.error('Connection error', err.stack));

module.exports = pool;
