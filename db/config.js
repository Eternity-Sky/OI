const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'oj_db',
    password: 'your_password', // 请修改为你的实际密码
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
