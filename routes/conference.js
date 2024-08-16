const express = require('express');
const router = express.Router();
const Conference = require('../models/conference');
const Feedback = require('../models/Feedback');

// View conference details and feedback form
router.get('/:id', (req, res) => {
    Promise.all([
        Conference.findById(req.params.id),
        Feedback.find({ conferenceId: req.params.id })
    ])
    .then(([conference, feedbacks]) => {
        if (!conference) {
            return res.status(404).send('Conference not found');
        }
        res.render('conference', { conference, feedbacks });
    })
    .catch(err => res.status(500).send(err));
});

// Submit feedback
router.post('/:id/feedback', (req, res) => {
    const { name, email, message } = req.body;

    const feedback = new Feedback({
        conferenceId: req.params.id,
        name,
        email,
        message
    });

    feedback.save()
        .then(() => res.redirect('/conference/' + req.params.id))
        .catch(err => res.status(500).send(err));
});

module.exports = router;