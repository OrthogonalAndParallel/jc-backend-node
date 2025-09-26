// userController.js - 负责处理 HTTP 请求和响应

const userService = require('./userService');

/**
 * 处理 GET /users 请求
 */
async function getUsers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

/**
 * 处理 POST /users 请求 (创建新用户)
 */
async function createNewUser(req, res) {
    const { name, email } = req.body; // 从请求体中获取数据

    try {
        const newUser = await userService.createUser(name, email);
        res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
    } catch (error) {
        console.error('Error creating user:', error.message);
        // 业务逻辑层抛出的错误可以被捕获并返回给客户端
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = {
    getUsers,
    createNewUser
};