const express = require('express');
const multer = require('multer');
const path = require('path');
const { Image, User } = require('../models');
const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload image route
router.get('/upload', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('upload');
});

router.post('/upload', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    try {
        const user = await User.findByPk(req.session.userId);
        await user.createImage({ title, description, imagePath });
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error uploading image');
    }
});

// Display all images route
router.get('/gallery', async (req, res) => {
    try {
        const images = await Image.findAll({
            include: User,
            order: [['createdAt', 'DESC']]
        });
        res.render('gallery', { images });
    } catch (err) {
        res.status(500).send('Error retrieving images');
    }
});
// My Own Pictures route
router.get('/my-pictures', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }

    try {
        const user = await User.findByPk(req.session.userId, {
            include: Image,
            order: [[Image, 'createdAt', 'DESC']]
        });

        if (user) {
            res.render('my-pictures', { images: user.Images });
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving your images');
    }
});

module.exports = router;
