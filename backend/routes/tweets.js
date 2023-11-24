var express = require('express');
var router = express.Router();
const Tweet = require('../models/tweets');
const User = require('../models/users');


router.get('/', (req, res) => {
    Tweet.find().then(tweets => {
        tweets.length ? res.json({ result: true, tweets }) : res.json({ result: false, error: "Tweet not found" })
    })
})

router.post('/newTweet', (req, res) => {
    const firstname = req.body.firstname;
    const username = req.body.username;
    const message = req.body.message;
    const date = req.body.date;

    const newTweet = new Tweet({
        firstname,
        username,
        message,
        date,
    });

    newTweet.save().then(() => {
        res.json({ result: true });
    });
})

router.post('/:tweetId/likedBy/:username', (req, res) => {

    const tweetId = req.params.tweetId;
    const username = req.params.username;

    User.findOne({ username }).then(user => {
        const userId = user._id;

        Tweet.updateOne({ _id: tweetId }, { $push: { isLikedBy: userId } }).then(() => {
            res.json({ result: true, message: "Tweet updated" })
        })

    })

})

router.post('/:tweetId/unlikedBy/:username', (req, res) => {

    const tweetId = req.params.tweetId;
    const username = req.params.username;

    User.findOne({ username }).then(user => {
        const userId = user._id;

        Tweet.updateOne({ _id: tweetId }, { $pull: { isLikedBy: userId } }).then(() => {
            res.json({ result: true, message: "Tweet updated" })
        })

    })

})


module.exports = router;
