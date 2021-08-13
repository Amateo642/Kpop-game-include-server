const { sequelize, Sequelize } = require('./sequelize');

const Girls = sequelize.define('girls', {
    name: {
        type: Sequelize.STRING
    },
    born: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    },
    urls: {
        type: Sequelize.STRING
    },
    voices: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    groupId: {
        type: Sequelize.INTEGER
    }
});

Girls.sync({ alter: true });

module.exports = Girls;
