# Study Javascript🔥🔥

## Sequelize
- 자바스크립트 객체와 데이터베이스 릴레이션을 매핑해주는 ORM

### Sequalize 설치
```
$ npm i sequelize sequelize-cli mysql2
$ npx sequelize init    // config, models, migrations, seeders 폴더가 생성됨
```
- sequelize-cli은 시퀄라이즈 명령어를 실행하기 위한 패키지
- mysql2는 MySQL과 시퀄라이즈를 이어주는 드라이버

### Sequelize 객체 생성
```javascript
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];  // 데이터베이스 정보 끌어오기
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

### MySQL 연동
```javascript
const { sequelize } = require('./models/index.js');

sequelize.sync({ force: false })    // force: true이면 서버 실행 시마다 테이블을 재생성함.
    .then(() => {
    console.log('db 연결 성공');
    })
    .catch((err) => {
        console.log('db 연결 실패');
    });
```

### Sequelize 모델 정의(엔티티)
- user 모델
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
            sequelize,                  // static init 메서드의 매개변수와 연결되는 옵션, 추후 db.sequelize 객체를 넣어야한다.
            modelName: "User",          // 모델 이름
            tableName: "users",         // 테이블 이름
            charset: 'utf8',            // 한글 입력 설정
            collate: 'utf8_general_ci', // 한글 입력 설정
            timestamps: false,          // true 이면, createAt과 updateAt 컬럼이 자동으로 추사된다.
            paranoid: false,            // true 이면, deleteAt 컬럼이 생성된다. 이후 로우를 삭제할 때 완전히 지워지지 않고 deleteAt에 지운 시각이 기록된다.
                                        // 로우를 조회하는 명령을 내렸을 때는 deleteAt의 값이 null인 로우를 조회한다. 이렇게 하는 이유는 로우를 복원해야하는 상황이 생기는 것을 대비하기 위함.
            underscored: false,         // camel case를 snake case로 바꾸는 옵션 -> ex) createdAt -> created_at
        });
    }

    static association(db) {
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});       // 일대다 연관 관계 매핑 (1 : N에서 1)
    }

};

module.exports = User;
```

### Sequelize 쿼리 예시
- 모두 조회 (SELECT * FROM USERS)
```javascript
const users = await User.findAll();
```

- 하나 조회 (SELECT * FROM USERS WHERE ID=?)
```javascript
const users = await User.findOne({
  where: { id: req.body.id }
});
```

- 삽입 (INSERT INTO USERS(NAME, AGE, MARRIED, COMMENT) VALUES(?, ?, ?, ?);
```javascript
const user = await User.create({
  name: req.body.name,
  age: req.body.age,
  married: req.body.married,
  comment: req.body.comment
});
```

- 수정 (UPDATE USERS SET COMMENT=? WHERE ID=?)
```javascript
const updateUser = await User.update({
        comment: req.body.comment
    }, {
        where: {'id': req.params.id}
    });
```

- 삭제 (DELETE USERS WHERE ID=?)
```javascript
await User.destroy({
  where: { id: req.params.id }
});
```

- 관계 쿼리(조인) (USER TABLE과 COMMENT TABLE 조인 후, 모든 정보 조회)
```javascript
const user = await User.findOne({
  include: {
    model: Comment,
  }
});
```

- 관계 쿼리(조인) (SELECT * FROM COMMENTS INNER JOIN USERS ON COMMENTS.ID = ?)
```javascript
const comments = await Comment.findAll({
  include: {
      model: User,
      where: { id: req.params.id }
  }
});
```