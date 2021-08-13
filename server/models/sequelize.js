const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize({ dialect: 'sqlite', storage: config.db.path, logging: config.isProd });

if (config.isDev) {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection to database has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}

module.exports = { sequelize, Sequelize };
