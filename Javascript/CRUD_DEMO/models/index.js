const Sequelize = require('sequelize');
const User = require('./user.js');
const Comment = require('./comment.js');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];  // 데이터베이스 연동 관련 정보 끌어오기
/**
  {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
 */

const db = {};

const sequelize = new Sequelize(config);
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(db.sequelize);
Comment.init(db.sequelize);

User.association(db);
Comment.association(db);

module.exports = db;