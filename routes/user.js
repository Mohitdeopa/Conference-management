const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Conference = require('../models/conference');

// User home
router.get('/', (req, res) => {
    res.render('user');
});

// Register user
router.post('/register', (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    newUser.save()
        .then(() => res.redirect('/user/schedules'))
        .catch(err => res.status(500).send('User already exists'));
});

// View schedules
router.get('/schedules', (req, res) => {
    Conference.find()
        .then(conferences => res.render('schedules', { conferences }))
        .catch(err => res.status(500).send('Currently no schedules'));
});

// Submit feedback
router.get('/feedback', (req, res) => {
    res.render('feedback');
});

router.post('/feedback', (req, res) => {
    // Save feedback to MongoDB
    res.send('Feedback submitted!');
});

module.exports = router;