const sequelize = require('../config/db');
const User = require('./user');
const Image = require('./image');

// Sync all models with the database
sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync error:', err));

module.exports = {
    User,
    Image,
    sequelize
};
