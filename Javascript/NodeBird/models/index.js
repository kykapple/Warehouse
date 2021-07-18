const Sequelize = require('sequelize');
const User = require('./user.js');
const Post = require('./post.js');
const Characteristic = require('./characteristic');

const env = 'development';
const config = require('../config/config.json')[env];

console.log(config);
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Characteristic = Characteristic;

User.init(db.sequelize);
Post.init(db.sequelize);
Characteristic.init(db.sequelize);

User.associate(db);
Post.associate(db);
Characteristic.associate(db);

module.exports = db;