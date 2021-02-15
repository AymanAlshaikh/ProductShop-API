const SequelizeSlugify = require("sequelize-slugify");
const Productz = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      price: {
        type: DataTypes.FLOAT,
        defaultValue: 5,
        validate: {
          min: 1,
          max: 100,
        },
      },
      description: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );
  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });
  return Product;
};
module.exports = Productz;
