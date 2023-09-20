const db = require("../../config/myconfig.js");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;

const Media = db.define('media', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    caption: { type: DataTypes.STRING },
    file: { type: DataTypes.STRING },
    filename: { type: DataTypes.STRING },
    original_filename: { type: DataTypes.STRING },
    createdAt: { field: 'created_at', type: Sequelize.DATE },
    updatedAt: { field: 'created_at', type: Sequelize.DATE },
}, {
    freezeTableName: true
});
exports.Media = Media
