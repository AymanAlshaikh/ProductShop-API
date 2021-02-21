const Users = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true },
      },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );

  return User;
};
module.exports = Users;
