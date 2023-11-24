var express = require('express');
var router = express.Router();
const Tweet = require('../models/tweets');
const User = require('../models/users');


router.get('/', (req, res) => {
    Tweet.find().then(tweets => {
        tweets.length ? res.json({ result: true, tweets }) : res.json({ result: false, error: "Tweet not found" })
    })
})

router.post('/getTweet', (req, res) => {
    const username = req.body.username;
    const message = req.body.message;

    Tweet.findOne({ username, message }).then(tweet => {
        tweet.username ? res.json({ result: true, tweet }) : res.json({ result: false, error: "No tweet found" })
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

router.get('/:tweetId/likedBy/:username', (req, res) => {

    const tweetId = req.params.tweetId;
    const username = req.params.username;

    User.findOne({ username }).then(user => {
        const userId = user._id;

        Tweet.updateOne({ _id: tweetId }, { $push: { isLikedBy: userId } }).then(() => {
            res.json({ result: true, message: "Tweet updated" })
        })
    })

})

router.get('/:tweetId/unlikedBy/:username', (req, res) => {

    const tweetId = req.params.tweetId;
    const username = req.params.username;

    User.findOne({ username }).then(user => {
        const userId = user._id;

        Tweet.updateOne({ _id: tweetId }, { $pull: { isLikedBy: userId } }).then(() => {

            res.json({ result: true, message: "Tweet removed" })
        })
    })

})

router.get('/:tweetId/isLikedBy/:username', (req, res) => {
    const tweetId = req.params.tweetId;
    const username = req.params.username;

    Tweet.findById(tweetId).populate('isLikedBy').then(tweetPopulated => {
        const userData = tweetPopulated.isLikedBy.filter(e => e.username == username);
        userData.length ? res.json({ result: true }) : res.json({ result: false })
    })


})

router.post('/deleteTweet', (req, res) => {
    const username = req.body.username;
    const message = req.body.message;

    Tweet.deleteOne({ username, message }).then(() => {
        res.json({ result: true, message: "Tweet deleted" })
    })

})


module.exports = router;
