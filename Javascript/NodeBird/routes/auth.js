const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res, next) => {
    passport.authenticate('local', { session: false },(authError, user, info) => {
        // 인증에 실패한 경우
        if(authError) {
            res.status(400).json({ message: 'login failed..' });
            return;
        }

        if(!user) {
            res.status(400).json({ message: info.message });
            return;
        }

        // Passport는 req에 login과 logout 메서드를 추가한다.
        req.login(user, { session: false }, (loginError) => {    // passport.serializeUser() 실행
            if(loginError) {
                return res.send(loginError);
            }

            const token = jwt.sign(
                { id: user.id },
                'jwt-secret-key',
                { expiresIn: "7d" }
            );

            return res.json({
                success : true,
                message : "로그인 성공",
                token
            });
        });

    })(req, res);
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