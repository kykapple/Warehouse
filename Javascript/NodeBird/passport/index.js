const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password',
    },
    async (id, password, done) => {
        console.log(id);
        try {
            const user = await User.findOne({
                where: { id: id }
            });

            if(!user) {
                return done(null, false, { message: '가입되지 않은 회원입니다.'});
            }

            const result = await bcrypt.compare(password, user.password);
            if(result) {
                return done(null, user);
            }

            return done(null, false, { message: '비밀번호가 일치하지 않습니다. '});
        } catch(error) {
            return done(error);
        }
    })
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'jwt-secret-key'
    },
    async (jwtPayload, done) => {
        try {
        // payload의 id값으로 사용자 조회
        const user = await User.findOne({
            where: { id: jwtPayload.id }
        });

        if(user) {
            return done(null, user);
        }
        return done(null, false, { message: '올바르지 않은 인증정보 입니다.'});
    } catch(error) {
        console.log("실패다~~~~~~~~~~~");
        done(error);
    }
    })
)

// const jwtConfig = {
//     // jwtFromRequest는 JWT를 추출하는 방법을 제공, 요청 header의 authorization JWT를 가져올 수 있도록 함.
//     // jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//     jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//     // JWT를 복호화 하기 위한 비밀 키, JWT를 생성할 때 사용한 키와 동일해야 한다.
//     secretOrKey: 'jwt-secret-key',
// };
//
// const jwtVerify = async (jwtPayload, done) => {
//     console.log("들옴");
//     try {
//         // payload의 id값으로 사용자 조회
//         const user = await User.findOne({
//             where: { id: jwtPayload.id }
//         });
//         if(user) {
//             done(null, user);
//         } else {
//             done(null, false, { message: '올바르지 않은 인증정보 입니다.'});
//         }
//     } catch(error) {
//         console.log("실패다~~~~~~~~~~~");
//         done(error);
//     }
// };

// module.exports = () => {
//     local();
// };