//connection to sql database

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'ddao',
    password: '888888',
    port: '33802',
    database: 'solclick_foundation_backend'
});

export default connection;