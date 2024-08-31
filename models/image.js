const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Image = sequelize.define('Image', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

// Associate Image with User
Image.belongsTo(User);
User.hasMany(Image);

module.exports = Image;
