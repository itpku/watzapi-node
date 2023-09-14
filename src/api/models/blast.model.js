var db = require("../../config/myconfig.js");
var { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;

const Blast = db.define('blasts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER },
    from: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    detail_id: { type: DataTypes.INTEGER },
    group: { type: DataTypes.STRING },
    qty: { type: DataTypes.INTEGER },
    scheduled_at: { type: DataTypes.DATE },
    sent_at: { type: DataTypes.DATE },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
}, {
    freezeTableName: true
});

exports.Blast = Blast