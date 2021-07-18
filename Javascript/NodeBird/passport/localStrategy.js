// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user.js');
//
// const bcrypt = require('bcrypt');
//
// const localConfig = {
//     usernameField: 'id',
//     passwordField: 'password',
// };
//
// const localVerify = async (id, password, done) => {
//     try {
//         const user = await User.findOne({
//             where: { id: id }
//         });
//
//         if(!user) {
//             done(null, false, { message: '가입되지 않은 회원입니다.'});
//             return;
//         }
//
//         const result = await bcrypt.compare(password, user.password);
//         if(result) {
//             done(null, user);
//         } else {
//             done(null, false, { message: '비밀번호가 일치하지 않습니다. '});
//         }
//
//     } catch(error) {
//         console.log(error);
//         done(error);
//     }
// }
//
// module.exports = () => {
//     passport.use('local', new LocalStrategy(localConfig, localVerify));
// };