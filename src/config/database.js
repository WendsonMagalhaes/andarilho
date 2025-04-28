const { Pool } = require('pg');
require('dotenv').config(); // Carrega as variáveis do .env

// Criação da instância do Pool do PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
