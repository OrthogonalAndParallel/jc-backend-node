// server.js - 应用的入口点
/* eslint-env node */

const express = require('express');
const bodyParser = require('body-parser'); // 用于解析 POST 请求体
const userController = require('./userController');
const { initializeDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;


// 中间件设置
app.use(bodyParser.json()); // 解析 application/json 格式的请求体

// 路由
app.get('/api/users', userController.getUsers);
app.post('/api/users', userController.createNewUser);
app.get('/', (req, res) => {
    res.send('Hello World! This is my Node.js backend.');
});

// 启动服务器
async function startServer() {
    try {
        // 1. 初始化数据库
        await initializeDatabase();

        // 2. 监听端口
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server or initialize database:', err);
        process.exit(1);
    }
}
startServer();

// 跨域
const cors = require('cors');
app.use(cors()); // 允许所有来源进行跨域访问
app.use(express.json()); // 启用解析请求体中的 JSON 数据