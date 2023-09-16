// import sequelize 
// import { Sequelize } from "sequelize";
// import connection 

var db = require("../../config/myconfig.js");
var { Sequelize } = require("sequelize");
// const db2 = new Sequelize('wea_db', 'wea', 'Fcug3Ci3B7xM6L9r', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const Outbox = db.define('outboxes', {
    // Define attributes
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
    // Freeze Table Name
    freezeTableName: true
});

// Export model Product
// export default Product;
// module.exports = Outbox
exports.Outbox = Outbox