const Productz = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 1,
        max: 100,
      },
    },
    description: { type: DataTypes.STRING },
  });
  return Product;
};
module.exports = Productz;
