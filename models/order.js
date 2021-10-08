const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CarOrder = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});

module.exports = CarOrder;