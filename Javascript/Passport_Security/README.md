# Implement Login/Logout with using Passport module🔥

## 로그인 동작 과정
- 사용자가 '/login'으로 서버에 요청을 보낸다.
- '/login'을 처리하는 라우터가 passport.authenticate('local')을 통해 LocalStrategy전략을 사용하도록 한다. (passport-local 모듈 필요)
- LocalStrategy전략을 구현한 모듈에서 form으로부터 전달 받은 값들로 데이터베이스를 조회하여, 경우에 따른 done() 함수를 호출한다.
- done() 함수의 인자들은 passport.authenticate('local', callback(...))의 callback함수의 인자로 들어간다.
- 여기서 데이터베이스를 조회해서 나온 결과에 따라 가입 정보가 없으면 예외 처리를 해주고, 있다면 req.login()을 호출한다. req.login()은 passport가 req에 추가해준 메서드로, 이 메서드를 호출할 때 인자로 user를 넘겨준다.
- 이 req.login()은  passport.serializeUser()를 실행하게 되고, done(null, user.id)를 통해 세션에 user.id를 저장한다.
- 사용자가 확인되었으니 req.login()함수의 callback함수는 로그인에 성공한 화면으로 이동시켜준다.

## 인가 동작 과정
- app.js에 app.use(passport.session())을 설정해두면, 라우터로 이동할 때마다 passport.deserializeUser()를 호출한다.
- passport.deserializeUser()에서는 res.session.passport.user에 저장된 아이디를 가져와서 데이터베이스에서 사용자를 조회한다.
- 조회되었다면 done(null, user)를 통해 req.user에 사용자 정보를 저장한다. (실패 시 done(null) 호출)
- 이제 서버에서는 req.user로 사용자 정보를 확인할 수 있다.

## 구현 코드
- passport 관련 모듈 설치 (bcrypt는 암호 해시 함수를 제공하는 모듈)
```
$ npm install passport passport-local bcrypt
```

- app.js
```javascript
const session = require('express-session');             // 세션 관리용 미들웨어
const passport = require('passport');
const passportConfig = require('./passport/index.js')   // passport.serializeUser(), passport.deserializeUser() 구현 모듈

passportConfig();                 // passport 설정 -> passport.serializeUser(), passport.deserializeUser() 등록

// 이 session함수를 실행시키면 session이 시작되는 것이고, express-session 미들웨어가 내부적으로 개입해서 내 애플리케이션이 session을 사용할 수 있도록 해준다.
// 그리고 session을 호출할 때 전달하는 이 객체에 따라서 session의 기본 동작을 바꿀 수 있다.
app.use(session({
  secret: 's_e-c%r*e/t#k)e!y',    // 이 값을 이용해 세션을 암호화해서 저장
  resave: false,                  // 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 확인하는 옵션
  saveUninitialized: false,       // 요청이 들어오면 세션에 저장할 내역이 없더라도 uninitialized 상태의 session을 저장할지 결정하는 옵션
                                  // true로 하면 아무 내용 없는 session이 계속해서 저장될 수 있다. 따라서 false로 설정해서 empty session이 쌓이는 것을 방지해서 서버 스토리지를 아껴야한다.
  cookie: {                       // 쿠키에 들어가는 세션 ID값의 옵션
      httpOnly: true,             // 클라이언트에서(js 코드로) 쿠키를 확인하지 못하도록 하는 옵션
      secure: false,              // https가 아닌 환경에서도 사용할 수 있도록 함 -> 배포 시에는 true로 설정 권장
  },
  // store 옵션 -> default로 메모리에 세션을 저장하도록 되어 있는데, 서버를 재시작하면 메모리가 초기화되니까 배포 시에는 store에 db를 연결하여 세션을 유지하는 게 좋다. -> 보통 레디스 사용
  })
);

app.use(passport.initialize());     // 사용자의 요청(req 객체)에 passport 설정을 심는다. (passport 동작)
app.use(passport.session());        // 라우터로 이동할 때마다 passport.session함수를 실행하도록 되어있는데, 이는 passport.deserializeUser를 호출한다. (인가)
```

- passport/index.js
```javascript
const passport = require('passport');
const local = require('./localStrategy.js');        // 로컬 전략 -> 다른 SNS서비스를 이용하지 않고 자체적으로 회원가입 후 로그인하는 것
const User = require('../models/user.js');

module.exports = () => {
    // req.login()에서 넘겨준 user 값
    passport.serializeUser((user, done) => {        // 로그인 시 실행되며, 세션에 어떤 데이터를 저장할지 정하는 메서드
        done(null, user.id);                        // 세션에 사용자 id만 저장 -> 메모리 부하 감소
    });

    // 매개 변수 id는 session에 저장된 값(req.session.passport.user)
    passport.deserializeUser((id, done) => {        // 매 요청 시 실행되며, passport.session 미들웨어가 이 메서드를 호출한다.
        User.findOne({
            where: { id: id}
        }).then(user => done(null, user))           // req.user에 user객체 저장 -> 이후 서버에서 인증된 사용자 정보 사용 가능
            .catch(err => done(err))
    });

    local();                                        // 로컬 전략 
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
                        done(null, false, { message: '비밀번호가 일치하지 않습니다. '});
                    }
                } else {
                    done(null, false, { message: '가입되지 않은 회원입니다.'});
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

    // Passport는 req에 login과 logout 메서드를 추가한다.
    return req.login(user, (loginError) => {    // passport.serializeUser() 실행
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
  req.logout();             // req.user 객체 제거
  req.session.destroy();    // req.session 객체 제거
  res.redirect('/');
});

module.exports = router;
```
