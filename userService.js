// userService.js - 负责用户相关的业务逻辑

const db = require('./db');

class UserService {
    /**
     * 获取所有用户
     */
    async getAllUsers() {
        // 可以在这里添加权限检查等业务逻辑
        const sql = 'SELECT id, name, email FROM users';
        return db.all(sql);
    }

    /**
     * 创建一个新用户
     * @param {string} name
     * @param {string} email
     */
    async createUser(name, email) {
        // 业务逻辑: 检查输入参数、验证邮箱格式等
        if (!name || !email) {
            throw new Error("Name and email are required.");
        }

        // 实际的数据库操作
        const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
        const result = await db.run(sql, [name, email]);

        // 返回新创建用户的 ID
        return { id: result.lastID, name, email };
    }

    // 可以添加更多方法如 findUserById, updateUser, deleteUser 等...
}

module.exports = new UserService();