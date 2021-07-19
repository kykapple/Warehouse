const express = require('express');
const Comment = require('../models/comment.js');

const router = express.Router();

router.get('/', async (req, res) => {
    const comments = await Comment.findAll();
    res.json(comments);
});

router.post('/', async (req, res) => {
    const comment = await Comment.create({
        commenter: req.body.id,
        comment: req.body.comment,
    });
    console.log(comment);
    res.status(201).json(comment);
});

router.put('/:id', async (req, res) => {
    const result = await Comment.update({
        comment: req.body.comment
    }, {
        where: { id: req.params.id }
    });
    res.status(201).json(result);
});

router.delete('/:id', async (req, res) => {
    const result = await Comment.destroy({
        where: { id: req.params.id }
    });
    res.json(result);
});

module.exports = router;