const db = require('../db/config');
const bcrypt = require('bcrypt');

const userService = {
    // 创建新用户
    async createUser(username, password, avatar) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO users (username, password, avatar) VALUES ($1, $2, $3) RETURNING id',
            [username, hashedPassword, avatar]
        );
        return result.rows[0];
    },

    // 验证用户登录
    async validateUser(username, password) {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return null;
        }
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return null;
        }
        return user;
    },

    // 更新用户最后登录时间
    async updateLastLogin(userId) {
        await db.query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [userId]
        );
    },

    // 获取用户信息
    async getUserByUsername(username) {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },

    // 标记题目为已完成
    async markProblemAsCompleted(userId, problemId) {
        try {
            await db.query(
                'INSERT INTO completed_problems (user_id, problem_id) VALUES ($1, $2)',
                [userId, problemId]
            );
            return true;
        } catch (error) {
            if (error.code === '23505') { // 唯一约束违反
                return false;
            }
            throw error;
        }
    },

    // 获取用户已完成的题目
    async getCompletedProblems(userId) {
        const result = await db.query(
            'SELECT problem_id FROM completed_problems WHERE user_id = $1',
            [userId]
        );
        return result.rows.map(row => row.problem_id);
    }
};

module.exports = userService;
