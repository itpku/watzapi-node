require("dotenv").config()
// console.log(process.env)

const dbHost = process.env.MYSQL_HOST
const dbName = process.env.MYSQL_DB
const dbUser = process.env.MYSQL_USER
const dbPasswd = process.env.MYSQL_PASSWD

var { Sequelize } = require("sequelize");
const db = new Sequelize(dbName, dbUser, dbPasswd, {
    host: dbHost,
    dialect: 'mysql',
    logging: false,
});

module.exports = db;


