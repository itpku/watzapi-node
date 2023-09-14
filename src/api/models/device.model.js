const db = require("../../config/myconfig.js");
const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;

const Device = db.define('devices', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    phone_no: { type: DataTypes.STRING },
    connected: { type: DataTypes.BOOLEAN },
    instance_key: { type: DataTypes.STRING },
    createdAt: { field: 'created_at', type: Sequelize.DATE },
    updatedAt: { field: 'created_at', type: Sequelize.DATE },
}, {
    freezeTableName: true
});
exports.Device = Device
