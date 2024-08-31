const express = require('express');
const session = require('express-session');
const { sequelize, Image, User } = require('./models');  // Import models here
const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/image');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');

// Routes
app.use('/', authRoutes);
app.use('/', imageRoutes);

// Home route
app.get('/', async (req, res) => {
    try {
        const images = await Image.findAll({ include: User, order: [['createdAt', 'DESC']] });  // Use the Image model
        res.render('index', { images });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving images');
    }
});

// Start server
app.listen(9090, async () => {
    console.log('Server running on http://localhost:9090');
    try {
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});
