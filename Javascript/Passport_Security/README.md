# Implement Login/Logout with using Passport module๐ฅ

## ๋ก๊ทธ์ธ ๋์ ๊ณผ์ 
- ์ฌ์ฉ์๊ฐ '/login'์ผ๋ก ์๋ฒ์ ์์ฒญ์ ๋ณด๋ธ๋ค.
- '/login'์ ์ฒ๋ฆฌํ๋ ๋ผ์ฐํฐ๊ฐ passport.authenticate('local')์ ํตํด LocalStrategy์ ๋ต์ ์ฌ์ฉํ๋๋ก ํ๋ค. (passport-local ๋ชจ๋ ํ์)
- LocalStrategy์ ๋ต์ ๊ตฌํํ ๋ชจ๋์์ form์ผ๋ก๋ถํฐ ์ ๋ฌ ๋ฐ์ ๊ฐ๋ค๋ก ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ์กฐํํ์ฌ, ๊ฒฝ์ฐ์ ๋ฐ๋ฅธ done() ํจ์๋ฅผ ํธ์ถํ๋ค.
- done() ํจ์์ ์ธ์๋ค์ passport.authenticate('local', callback(...))์ callbackํจ์์ ์ธ์๋ก ๋ค์ด๊ฐ๋ค.
- ์ฌ๊ธฐ์ ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ์กฐํํด์ ๋์จ ๊ฒฐ๊ณผ์ ๋ฐ๋ผ ๊ฐ์ ์ ๋ณด๊ฐ ์์ผ๋ฉด ์์ธ ์ฒ๋ฆฌ๋ฅผ ํด์ฃผ๊ณ , ์๋ค๋ฉด req.login()์ ํธ์ถํ๋ค. req.login()์ passport๊ฐ req์ ์ถ๊ฐํด์ค ๋ฉ์๋๋ก, ์ด ๋ฉ์๋๋ฅผ ํธ์ถํ  ๋ ์ธ์๋ก user๋ฅผ ๋๊ฒจ์ค๋ค.
- ์ด req.login()์  passport.serializeUser()๋ฅผ ์คํํ๊ฒ ๋๊ณ , done(null, user.id)๋ฅผ ํตํด ์ธ์์ user.id๋ฅผ ์ ์ฅํ๋ค.
- ์ฌ์ฉ์๊ฐ ํ์ธ๋์์ผ๋ req.login()ํจ์์ callbackํจ์๋ ๋ก๊ทธ์ธ์ ์ฑ๊ณตํ ํ๋ฉด์ผ๋ก ์ด๋์์ผ์ค๋ค.

## ์ธ๊ฐ ๋์ ๊ณผ์ 
- app.js์ app.use(passport.session())์ ์ค์ ํด๋๋ฉด, ๋ผ์ฐํฐ๋ก ์ด๋ํ  ๋๋ง๋ค passport.deserializeUser()๋ฅผ ํธ์ถํ๋ค.
- passport.deserializeUser()์์๋ res.session.passport.user์ ์ ์ฅ๋ ์์ด๋๋ฅผ ๊ฐ์ ธ์์ ๋ฐ์ดํฐ๋ฒ ์ด์ค์์ ์ฌ์ฉ์๋ฅผ ์กฐํํ๋ค.
- ์กฐํ๋์๋ค๋ฉด done(null, user)๋ฅผ ํตํด req.user์ ์ฌ์ฉ์ ์ ๋ณด๋ฅผ ์ ์ฅํ๋ค. (์คํจ ์ done(null) ํธ์ถ)
- ์ด์  ์๋ฒ์์๋ req.user๋ก ์ฌ์ฉ์ ์ ๋ณด๋ฅผ ํ์ธํ  ์ ์๋ค.

## ๊ตฌํ ์ฝ๋
- passport ๊ด๋ จ ๋ชจ๋ ์ค์น (bcrypt๋ ์ํธ ํด์ ํจ์๋ฅผ ์ ๊ณตํ๋ ๋ชจ๋)
```
$ npm install passport passport-local bcrypt
```

- app.js
```javascript
const session = require('express-session');             // ์ธ์ ๊ด๋ฆฌ์ฉ ๋ฏธ๋ค์จ์ด
const passport = require('passport');
const passportConfig = require('./passport/index.js')   // passport.serializeUser(), passport.deserializeUser() ๊ตฌํ ๋ชจ๋

passportConfig();                 // passport ์ค์  -> passport.serializeUser(), passport.deserializeUser() ๋ฑ๋ก

// ์ด sessionํจ์๋ฅผ ์คํ์ํค๋ฉด session์ด ์์๋๋ ๊ฒ์ด๊ณ , express-session ๋ฏธ๋ค์จ์ด๊ฐ ๋ด๋ถ์ ์ผ๋ก ๊ฐ์ํด์ ๋ด ์ ํ๋ฆฌ์ผ์ด์์ด session์ ์ฌ์ฉํ  ์ ์๋๋ก ํด์ค๋ค.
// ๊ทธ๋ฆฌ๊ณ  session์ ํธ์ถํ  ๋ ์ ๋ฌํ๋ ์ด ๊ฐ์ฒด์ ๋ฐ๋ผ์ session์ ๊ธฐ๋ณธ ๋์์ ๋ฐ๊ฟ ์ ์๋ค.
app.use(session({
  secret: 's_e-c%r*e/t#k)e!y',    // ์ด ๊ฐ์ ์ด์ฉํด ์ธ์์ ์ํธํํด์ ์ ์ฅ
  resave: false,                  // ์์ฒญ์ด ์ฌ ๋ ์ธ์์ ์์  ์ฌํญ์ด ์๊ธฐ์ง ์๋๋ผ๋ ์ธ์์ ๋ค์ ์ ์ฅํ ์ง ํ์ธํ๋ ์ต์
  saveUninitialized: false,       // ์์ฒญ์ด ๋ค์ด์ค๋ฉด ์ธ์์ ์ ์ฅํ  ๋ด์ญ์ด ์๋๋ผ๋ uninitialized ์ํ์ session์ ์ ์ฅํ ์ง ๊ฒฐ์ ํ๋ ์ต์
                                  // true๋ก ํ๋ฉด ์๋ฌด ๋ด์ฉ ์๋ session์ด ๊ณ์ํด์ ์ ์ฅ๋  ์ ์๋ค. ๋ฐ๋ผ์ false๋ก ์ค์ ํด์ empty session์ด ์์ด๋ ๊ฒ์ ๋ฐฉ์งํด์ ์๋ฒ ์คํ ๋ฆฌ์ง๋ฅผ ์๊ปด์ผํ๋ค.
  cookie: {                       // ์ฟ ํค์ ๋ค์ด๊ฐ๋ ์ธ์ ID๊ฐ์ ์ต์
      httpOnly: true,             // ํด๋ผ์ด์ธํธ์์(js ์ฝ๋๋ก) ์ฟ ํค๋ฅผ ํ์ธํ์ง ๋ชปํ๋๋ก ํ๋ ์ต์
      secure: false,              // https๊ฐ ์๋ ํ๊ฒฝ์์๋ ์ฌ์ฉํ  ์ ์๋๋ก ํจ -> ๋ฐฐํฌ ์์๋ true๋ก ์ค์  ๊ถ์ฅ
  },
  // store ์ต์ -> default๋ก ๋ฉ๋ชจ๋ฆฌ์ ์ธ์์ ์ ์ฅํ๋๋ก ๋์ด ์๋๋ฐ, ์๋ฒ๋ฅผ ์ฌ์์ํ๋ฉด ๋ฉ๋ชจ๋ฆฌ๊ฐ ์ด๊ธฐํ๋๋๊น ๋ฐฐํฌ ์์๋ store์ db๋ฅผ ์ฐ๊ฒฐํ์ฌ ์ธ์์ ์ ์งํ๋ ๊ฒ ์ข๋ค. -> ๋ณดํต ๋ ๋์ค ์ฌ์ฉ
  })
);

app.use(passport.initialize());     // ์ฌ์ฉ์์ ์์ฒญ(req ๊ฐ์ฒด)์ passport ์ค์ ์ ์ฌ๋๋ค. (passport ๋์)
app.use(passport.session());        // ๋ผ์ฐํฐ๋ก ์ด๋ํ  ๋๋ง๋ค passport.sessionํจ์๋ฅผ ์คํํ๋๋ก ๋์ด์๋๋ฐ, ์ด๋ passport.deserializeUser๋ฅผ ํธ์ถํ๋ค. (์ธ๊ฐ)
```

- passport/index.js
```javascript
const passport = require('passport');
const local = require('./localStrategy.js');        // ๋ก์ปฌ ์ ๋ต -> ๋ค๋ฅธ SNS์๋น์ค๋ฅผ ์ด์ฉํ์ง ์๊ณ  ์์ฒด์ ์ผ๋ก ํ์๊ฐ์ ํ ๋ก๊ทธ์ธํ๋ ๊ฒ
const User = require('../models/user.js');

module.exports = () => {
    // req.login()์์ ๋๊ฒจ์ค user ๊ฐ
    passport.serializeUser((user, done) => {        // ๋ก๊ทธ์ธ ์ ์คํ๋๋ฉฐ, ์ธ์์ ์ด๋ค ๋ฐ์ดํฐ๋ฅผ ์ ์ฅํ ์ง ์ ํ๋ ๋ฉ์๋
        done(null, user.id);                        // ์ธ์์ ์ฌ์ฉ์ id๋ง ์ ์ฅ -> ๋ฉ๋ชจ๋ฆฌ ๋ถํ ๊ฐ์
    });

    // ๋งค๊ฐ ๋ณ์ id๋ session์ ์ ์ฅ๋ ๊ฐ(req.session.passport.user)
    passport.deserializeUser((id, done) => {        // ๋งค ์์ฒญ ์ ์คํ๋๋ฉฐ, passport.session ๋ฏธ๋ค์จ์ด๊ฐ ์ด ๋ฉ์๋๋ฅผ ํธ์ถํ๋ค.
        User.findOne({
            where: { id: id}
        }).then(user => done(null, user))           // req.user์ user๊ฐ์ฒด ์ ์ฅ -> ์ดํ ์๋ฒ์์ ์ธ์ฆ๋ ์ฌ์ฉ์ ์ ๋ณด ์ฌ์ฉ ๊ฐ๋ฅ
            .catch(err => done(err))
    });

    local();                                        // ๋ก์ปฌ ์ ๋ต 
};
```

- passport/localStrategy.js
```javascript
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(
        new localStrategy({
            usernameField: 'id',
            passwordField: 'password',
        }, async (id, password, done) => {
            try {
                const user = await User.findOne({
                    where: { id: id }
                });

                if(user) {
                    const result = await bcrypt.compare(password, user.password);
                    if(result) {
                        done(null, user);
                    } else {
                        done(null, false, { message: '๋น๋ฐ๋ฒํธ๊ฐ ์ผ์นํ์ง ์์ต๋๋ค. '});
                    }
                } else {
                    done(null, false, { message: '๊ฐ์๋์ง ์์ ํ์์๋๋ค.'});
                }
            } catch(error) {
                console.log(error);
                done(error);
            }
        }
    ));
};
```

- routes/users.js
```javascript
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if(authError) {
      console.log(authError);
      next(authError);
    }

    if(!user) {
      console.log(info.message);
      next(info.message);
    }

    // Passport๋ req์ login๊ณผ logout ๋ฉ์๋๋ฅผ ์ถ๊ฐํ๋ค.
    return req.login(user, (loginError) => {    // passport.serializeUser() ์คํ
      if(loginError) {
        console.log(loginError);
        next(loginError);
      }
      return res.render('success');
    });

  })(req, res, next);
});

router.post('/join', async (req, res) => {
  const { id, email, nick, password } = req.body;
  const user = await User.findOne({
    where: { id: id },
  });

  if(user) {
    res.render('join');
  }

  const hash = await bcrypt.hash(password, 12);
  await User.create({
    id,
    email,
    nick,
    password: hash,
    provider: "local?",
  });

  res.render('index');
});

router.post('/logout', (req, res, next) => {
  req.logout();             // req.user ๊ฐ์ฒด ์ ๊ฑฐ
  req.session.destroy();    // req.session ๊ฐ์ฒด ์ ๊ฑฐ
  res.redirect('/');
});

module.exports = router;
```
