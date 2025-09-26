// db.js - 负责数据库连接和初始化

const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'mydatabase.sqlite');

let db;

/**
 * 初始化数据库连接和表结构
 */
async function initializeDatabase() {
    if (db) return db; // 如果已连接，直接返回

    // 1. 打开数据库连接
    db = await sqlite.open({
        filename: DB_PATH,
        driver: sqlite3.Database,
    });

    // 2. 创建表 (如果不存在)
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );
  `);

    console.log('Database initialized and connected.');
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