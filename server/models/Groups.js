const { sequelize, Sequelize } = require('./sequelize');

const Groups = sequelize.define('groups', {
    name: {
        type: Sequelize.STRING
    },
    urls: {
        type: Sequelize.STRING
    }
});

Groups.sync({ alter: true });

module.exports = Groups;
