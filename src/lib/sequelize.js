const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  username: "root",
  password: "password",
  database: "chat_app",
  port: 3306,
  dialect: "mysql",
  logging: false,
});

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
  },
  fullname: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

const ChatMessages = sequelize.define("ChatMessage", {
  message: {
    type: DataTypes.STRING,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
  },
});

const Room = sequelize.define("Room", {
  room_name: {
    type: DataTypes.STRING,
  },
});

const UserRoom = sequelize.define("UserRoom", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
});

User.belongsToMany(Room, { through: UserRoom, foreignKey: "user_id" });
Room.belongsToMany(User, { through: UserRoom, foreignKey: "room_id" });

User.hasMany(ChatMessages, { foreignKey: "user_id" });
ChatMessages.belongsTo(User, { foreignKey: "user_id" });

Room.hasMany(ChatMessages, { foreignKey: "room_id" });
ChatMessages.belongsTo(Room, { foreignKey: "room_id" });

module.exports = {
  User,
  ChatMessages,
  Room,
  UserRoom,
  sequelize,
};
