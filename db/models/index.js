"use strict";
const { Shop } = require("./Shop");
const { Product } = require("./Product");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Relations
db.Shop.hasMany(db.Product, { foreignKey: "shopId", as: "products" });
db.Product.belongsTo(db.Shop, { foreignKey: "shopId", as: "shop" });

db.User.hasOne(db.Shop, { as: "shop", foreignKey: "userId" });
db.Shop.belongsTo(db.User, { as: "user" });

db.User.hasMany(db.Order, { as: "orders", foreignKey: "userId" });
db.Order.belongsTo(db.User, { as: "user" });

db.Order.belongsToMany(db.Product, {
  through: db.OrderItem,
  foreignKey: "orderId",
});
db.Product.belongsToMany(db.Order, {
  through: db.OrderItem,
  foreignKey: "productId",
});

module.exports = db;
