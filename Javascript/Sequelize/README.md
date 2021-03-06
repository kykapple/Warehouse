# Study Javascript๐ฅ๐ฅ

## Sequelize
- ์๋ฐ์คํฌ๋ฆฝํธ ๊ฐ์ฒด์ ๋ฐ์ดํฐ๋ฒ ์ด์ค ๋ฆด๋ ์ด์์ ๋งคํํด์ฃผ๋ ORM

### Sequalize ์ค์น
```
$ npm i sequelize sequelize-cli mysql2
$ npx sequelize init    // config, models, migrations, seeders ํด๋๊ฐ ์์ฑ๋จ
```
- sequelize-cli์ ์ํ๋ผ์ด์ฆ ๋ช๋ น์ด๋ฅผ ์คํํ๊ธฐ ์ํ ํจํค์ง
- mysql2๋ MySQL๊ณผ ์ํ๋ผ์ด์ฆ๋ฅผ ์ด์ด์ฃผ๋ ๋๋ผ์ด๋ฒ

### Sequelize ๊ฐ์ฒด ์์ฑ
```javascript
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];  // ๋ฐ์ดํฐ๋ฒ ์ด์ค ์ ๋ณด ๋์ด์ค๊ธฐ
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

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

module.exports = db;
```

### MySQL ์ฐ๋
```javascript
const { sequelize } = require('./models/index.js');

sequelize.sync({ force: false })    // force: true์ด๋ฉด ์๋ฒ ์คํ ์๋ง๋ค ํ์ด๋ธ์ ์ฌ์์ฑํจ.
    .then(() => {
    console.log('db ์ฐ๊ฒฐ ์ฑ๊ณต');
    })
    .catch((err) => {
        console.log('db ์ฐ๊ฒฐ ์คํจ');
    });
```

### Sequelize ๋ชจ๋ธ ์ ์(์ํฐํฐ)
- user ๋ชจ๋ธ
```javascript
const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,                  // static init ๋ฉ์๋์ ๋งค๊ฐ๋ณ์์ ์ฐ๊ฒฐ๋๋ ์ต์, ์ถํ db.sequelize ๊ฐ์ฒด๋ฅผ ๋ฃ์ด์ผํ๋ค.
            modelName: "User",          // ๋ชจ๋ธ ์ด๋ฆ
            tableName: "users",         // ํ์ด๋ธ ์ด๋ฆ
            charset: 'utf8',            // ํ๊ธ ์๋ ฅ ์ค์ 
            collate: 'utf8_general_ci', // ํ๊ธ ์๋ ฅ ์ค์ 
            timestamps: false,          // true ์ด๋ฉด, createAt๊ณผ updateAt ์ปฌ๋ผ์ด ์๋์ผ๋ก ์ถ์ฌ๋๋ค.
            paranoid: false,            // true ์ด๋ฉด, deleteAt ์ปฌ๋ผ์ด ์์ฑ๋๋ค. ์ดํ ๋ก์ฐ๋ฅผ ์ญ์ ํ  ๋ ์์ ํ ์ง์์ง์ง ์๊ณ  deleteAt์ ์ง์ด ์๊ฐ์ด ๊ธฐ๋ก๋๋ค.
                                        // ๋ก์ฐ๋ฅผ ์กฐํํ๋ ๋ช๋ น์ ๋ด๋ ธ์ ๋๋ deleteAt์ ๊ฐ์ด null์ธ ๋ก์ฐ๋ฅผ ์กฐํํ๋ค. ์ด๋ ๊ฒ ํ๋ ์ด์ ๋ ๋ก์ฐ๋ฅผ ๋ณต์ํด์ผํ๋ ์ํฉ์ด ์๊ธฐ๋ ๊ฒ์ ๋๋นํ๊ธฐ ์ํจ.
            underscored: false,         // camel case๋ฅผ snake case๋ก ๋ฐ๊พธ๋ ์ต์ -> ex) createdAt -> created_at
        });
    }

    static association(db) {
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});       // ์ผ๋๋ค ์ฐ๊ด ๊ด๊ณ ๋งคํ (1 : N์์ 1)
    }

};

module.exports = User;
```

### Sequelize ์ฟผ๋ฆฌ ์์
- ๋ชจ๋ ์กฐํ (SELECT * FROM USERS)
```javascript
const users = await User.findAll();
```

- ํ๋ ์กฐํ (SELECT * FROM USERS WHERE ID=?)
```javascript
const users = await User.findOne({
  where: { id: req.body.id }
});
```

- ์ฝ์ (INSERT INTO USERS(NAME, AGE, MARRIED, COMMENT) VALUES(?, ?, ?, ?);
```javascript
const user = await User.create({
  name: req.body.name,
  age: req.body.age,
  married: req.body.married,
  comment: req.body.comment
});
```

- ์์  (UPDATE USERS SET COMMENT=? WHERE ID=?)
```javascript
const updateUser = await User.update({
        comment: req.body.comment
    }, {
        where: {'id': req.params.id}
    });
```

- ์ญ์  (DELETE USERS WHERE ID=?)
```javascript
await User.destroy({
  where: { id: req.params.id }
});
```

- ๊ด๊ณ ์ฟผ๋ฆฌ(์กฐ์ธ) (USER TABLE๊ณผ COMMENT TABLE ์กฐ์ธ ํ, ๋ชจ๋  ์ ๋ณด ์กฐํ)
```javascript
const user = await User.findOne({
  include: {
    model: Comment,
  }
});
```

- ๊ด๊ณ ์ฟผ๋ฆฌ(์กฐ์ธ) (SELECT * FROM COMMENTS INNER JOIN USERS ON COMMENTS.ID = ?)
```javascript
const comments = await Comment.findAll({
  include: {
      model: User,
      where: { id: req.params.id }
  }
});
```