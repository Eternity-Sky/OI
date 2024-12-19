const fs = require('fs');
const path = require('path');
const { pool } = require('./config');

async function setupDatabase() {
    try {
        // 读取 init.sql 文件内容
        const initSql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
        
        // 连接数据库并执行 SQL
        const client = await pool.connect();
        try {
            await client.query(initSql);
            console.log('数据库表创建成功！');
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('设置数据库时出错:', err);
    } finally {
        await pool.end();
    }
}

setupDatabase();
