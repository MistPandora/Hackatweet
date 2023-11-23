var express = require('express');
var router = express.Router();

const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');


router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    User.findOne({ username: req.body.username }).then(data => {
        if (data === null) {
            const hash = bcrypt.hashSync(req.body.password, 10);

            const newUser = new User({
                firstname: req.body.firstname,
                username: req.body.username,
                password: hash,
                token: uid2(32),
            });

            newUser.save().then(newDoc => {
                res.json({ result: true, token: newDoc.token });
            });
        } else {
            res.json({ result: false, error: 'User already exists' });
        }
    });
});

router.post('/signin', (req, res) => {
    if (!checkBody(req.body, ['username', 'password'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }

    User.findOne({ username: req.body.username }).then(data => {
        if (data && bcrypt.compareSync(req.body.password, data.password)) {
            res.json({ result: true, token: data.token });
        } else {
            res.json({ result: false, error: "User couldn't be found" });
        }
    });
});

router.get('/connected/:username', (req, res) => {
    const username = req.params.username;
    User.findOne({ username }).then(user => {
        user ? res.json({ result: true, user }) : res.json({ result: false, error: "User not found" })
    })
});

module.exports = router;
