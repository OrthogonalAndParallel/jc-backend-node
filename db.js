// db.js - 负责数据库连接和初始化

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

// -----------------------------------------------------------
// 改造点 1: 从环境变量获取数据库路径，提供本地开发默认值
// -----------------------------------------------------------
// 在 Render 上，我们会将 DB_PATH 环境变量设置为磁盘的挂载路径，如 /var/data/mydatabase.sqlite
// 在本地开发时，如果没有设置环境变量，则使用本地路径。
const DB_PATH = process.env.DB_PATH || 'mydatabase.sqlite';

let db;

/**
 * 初始化数据库连接和表结构
 */
async function initializeDatabase() {
    if (db) return db; // 如果已连接，直接返回

    // 1. 打开数据库连接
    db = await sqlite.open({
        filename: DB_PATH, // 使用动态路径
        driver: sqlite3.Database,
    });

    // 2. 创建表 (如果不存在)
    // 保持原有的建表逻辑，但可以根据需要添加更多表。
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name TEXT NOT NULL,
             email TEXT UNIQUE NOT NULL
        );
    `);

    console.log(`Database initialized and connected at: ${DB_PATH}`);
    return db;
}

// 导出常用的数据库操作函数
async function run(sql, params = []) {
    await initializeDatabase();
    return db.run(sql, params);
}

async function get(sql, params = []) {
    await initializeDatabase();
    return db.get(sql, params);
}

async function all(sql, params = []) {
    await initializeDatabase();
    return db.all(sql, params);
}

module.exports = {
    run,
    get,
    all,
    initializeDatabase // 仅用于启动时调用
};