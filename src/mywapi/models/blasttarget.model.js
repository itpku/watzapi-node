var db = require("../../config/myconfig.js");
var { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;

const BlastTarget = db.define('blast_targets', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER },
    blast_id: { type: DataTypes.INTEGER },
    to: { type: DataTypes.STRING },
    toName: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
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

exports.BlastTarget = BlastTarget