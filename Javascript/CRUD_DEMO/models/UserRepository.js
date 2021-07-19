const db = require('./index.js');

db.sequelize.sync({ force: false})
    .then(() => {
        console.log('연결?');
    })
    .catch(error => {
        console.log("실패ㅜ");
});