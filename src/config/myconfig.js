var { Sequelize } = require("sequelize");
const db = new Sequelize('wea_db', 'wea', 'Fcug3Ci3B7xM6L9r', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = db;