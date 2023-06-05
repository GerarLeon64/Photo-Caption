const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5433,
    password: 'postgres',
    database: 'photo'
  });

client.connect();