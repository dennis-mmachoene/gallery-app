const { Sequelize } = require('sequelize');

// Create a Sequelize instance with your database credentials
const sequelize = new Sequelize('gallery_db', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
