const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Meetup = sequelize.define("meetup", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  content: { type: DataTypes.STRING },
  keywords: { type: DataTypes.STRING },
  meetupLocation: { type: DataTypes.STRING },
  meetupDate: { type: DataTypes.STRING },
});

User.hasMany(Meetup, {
  foreignKey: "userId",
});
Meetup.belongsTo(User);

module.exports = {
  User,
  Meetup,
};
