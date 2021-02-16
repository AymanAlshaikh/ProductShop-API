const SequelizeSlugify = require("sequelize-slugify");
const Shops = (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    "Shop",
    {
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Shop, {
    source: ["name"],
  });
  return Shop;
};
module.exports = Shops;
