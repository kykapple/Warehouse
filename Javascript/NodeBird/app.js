const express = require('express');
const passport = require('passport');

require('./passport/index.js');

const { sequelize } = require('./models/index.js');
const page = require('./routes/index.js');
const user = require('./routes/users.js');
const auth = require('./routes/auth.js');

const app = express();
const PORT = 3000;

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', page);
app.use('/users', passport.authenticate('jwt', {session: false}), user);
app.use('/auth', auth);

sequelize.sync({ force: false })
    .then(() => {
        console.log("db 성공");
    })
    .catch((err) => {
        console.log(err);
    })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json('err');
});

app.listen(PORT, () => {
    console.log("서버 실행");
})






