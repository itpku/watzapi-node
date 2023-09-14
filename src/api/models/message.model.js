var db = require("../../config/myconfig.js");
var { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;

const Message = db.define('messages', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    user_id: { type: DataTypes.INTEGER },
    from: { type: DataTypes.STRING },
    to: { type: DataTypes.STRING },
    toName: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    detail_id: { type: DataTypes.INTEGER },
    group: { type: DataTypes.STRING },
    remark: { type: DataTypes.STRING },
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

exports.Message = Message