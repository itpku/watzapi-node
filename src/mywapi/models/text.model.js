const db = require("../../config/myconfig.js");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;

const Text = db.define('texts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    text: { type: DataTypes.STRING },
    createdAt: { field: 'created_at', type: Sequelize.DATE },
    updatedAt: { field: 'created_at', type: Sequelize.DATE },
}, {
    freezeTableName: true
});
exports.Text = Text
