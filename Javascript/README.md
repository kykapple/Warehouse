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



