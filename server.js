const express = require('express');
const cors = require('cors');
const session = require('express-session');
const userService = require('./services/userService');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // 开发环境下设为false
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7天
    }
}));

// 注册
app.post('/api/register', async (req, res) => {
    try {
        const { username, password, avatar } = req.body;
        
        // 检查用户名是否已存在
        const existingUser = await userService.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: '用户名已存在' });
        }

        const user = await userService.createUser(username, password, avatar);
        res.json({ success: true, userId: user.id });
    } catch (error) {
        console.error('注册错误:', error);
        res.status(500).json({ error: '注册失败' });
    }
});

// 登录
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.validateUser(username, password);
        
        if (!user) {
            return res.status(401).json({ error: '用户名或密码错误' });
        }

        await userService.updateLastLogin(user.id);
        req.session.userId = user.id;
        req.session.username = user.username;

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({ error: '登录失败' });
    }
});

// 获取用户信息
app.get('/api/user', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: '未登录' });
    }

    try {
        const user = await userService.getUserByUsername(req.session.username);
        const completedProblems = await userService.getCompletedProblems(user.id);
        
        res.json({
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            completedProblems
        });
    } catch (error) {
        console.error('获取用户信息错误:', error);
        res.status(500).json({ error: '获取用户信息失败' });
    }
});

// 标记题目完成
app.post('/api/problems/complete', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: '未登录' });
    }

    try {
        const { problemId } = req.body;
        const success = await userService.markProblemAsCompleted(req.session.userId, problemId);
        res.json({ success });
    } catch (error) {
        console.error('标记题目完成错误:', error);
        res.status(500).json({ error: '操作失败' });
    }
});

// 退出登录
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
