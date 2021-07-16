const express = require('express');
const path = require('path');
const indexRouter = require('./routes/indexRouter.js');
const userRouter = require('./routes/userRouter.js');
const commentRouter = require('./routes/commentRouter.js');

const { sequelize } = require('./models/index.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter);

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public');

sequelize.sync({ force: false })    // force: true이면 서버 실행 시마다 테이블을 재생성함.
    .then(() => {
    console.log('db 연결 성공');
    })
    .catch((err) => {
        console.log(err);
    });

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;   // 미들웨어에서 설정한 값을 뷰에서 사용할 수 있게 해준다.
    res.status(err.status || 500);
    res.render('error');
    console.log(err.message);
})

app.listen(PORT, () => {
    console.log(PORT, '번 포트로 서버 연결');
})