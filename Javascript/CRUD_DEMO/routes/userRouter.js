const express = require('express');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');

const db = require('../models/index');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
       const users = await User.findAll();
       res.json(users);
    })
    .post(async (req, res) => {
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            married: req.body.married,
            comment: req.body.comment
        });
        res.status(201).json(user);
    });

router.put('/:id', async (req, res) => {
    const updateUser = await User.update({
        comment: req.body.comment
    }, {
        where: {'id': req.params.id}
    });
    res.status(201).json(updateUser);
});

router.delete('/:id', async (req, res) => {
    await User.destroy({
        where: { id: req.params.id }
    });
    res.redirect('/users');
});

router.get('/:id/comments', async (req, res) => {
    const comments = await Comment.findAll({
        include: {
            model: User,
            where: { id: req.params.id }
        }
    });

    // 해당 id의 user를 select해오고, 그 user에 getComments()를 하면 시퀄라이즈가 자동으로 join해서 comment를 가져온다.
    // const user = await User.findOne({
    //     where: { id: req.params.id },
    // });
    // const comments = await user.getComments();

    // user 테이블과 comment 테이블 join
    // const user = await User.findOne({
    //     include: {
    //         model: Comment
    //     },
    //     where: { id: req.params.id }
    // });

    // raw 쿼리
    // const result = await db.sequelize.query("select * from users users inner join comments comments on users.id = comments.commenter ");
    // res.json(result);

    res.json(comments);

});

module.exports = router;
