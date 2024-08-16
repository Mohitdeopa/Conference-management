const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;