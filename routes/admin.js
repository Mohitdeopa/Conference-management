const express = require('express');
const router = express.Router();
const Conference = require('../models/conference');
const Feedback = require('../models/Feedback');
const User = require('../models/user');

// Admin home
router.get('/',async (req, res) => {
    try{
        const conferences = await Conference.find();
        const feedbacks = await Feedback.find();
        const users = await User.find();
     res.render('admin',{conferences,feedbacks,users});
}catch (err){
    console.error(err);
    res.status(500).send(err);
}  
});

// Create a new conference
router.get('/new', (req, res) => {
    res.render('newConference');
});

router.post('/', (req, res) => {
    const { title, description, date } = req.body;
    const newConference = new Conference({ title, description, date });
    newConference.save()
        .then(() => res.redirect('/admin'))
        .catch(err => res.status(500).send(err));
});

// Edit a conference
router.get('/edit/:id', (req, res) => {
    Conference.findById(req.params.id)
        .then(conference => res.render('editConference', { conference }))
        .catch(err => res.status(500).send(err));
});

router.post('/edit/:id', (req, res) => {
    const { title, description, date } = req.body;
    Conference.findByIdAndUpdate(req.params.id, { title, description, date })
        .then(() => res.redirect('/admin'))
        .catch(err => res.status(500).send(err));
});

// Delete a conference
router.post('/delete/:id', (req, res) => {
    Conference.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/admin'))
        .catch(err => res.status(500).send(err));
});

router.post('/user/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
router.post('/feedback/delete/:id', async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;
