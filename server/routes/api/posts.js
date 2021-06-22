const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');



//Get Posts..
router.get('/', (req, res) => {
    Post.find().then(posts => res.json(posts));
})

//Add Post..
router.post('/', (req, res) => {
    const newPost = new Post({
        text: req.body.text
    })
    newPost.save().then(post => res.json(post));
})

//Delete Post..
router.delete('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(item => item
            .remove()
            .then(() => res.json({ success: true }))
        );
})
module.exports = router;