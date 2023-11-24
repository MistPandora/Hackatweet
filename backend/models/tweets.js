const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    firstname: String,
    username: String,
    message: String,
    date: Date,
    isLikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;