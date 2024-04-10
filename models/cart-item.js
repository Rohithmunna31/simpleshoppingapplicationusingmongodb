const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Cartitem = sequelize.define("cartitem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncreament: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Cartitem;
