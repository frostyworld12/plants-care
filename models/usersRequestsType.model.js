module.exports = (sequelize, Sequelize) => {
  const UserRequestType = sequelize.define("UserRequestType", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  UserRequestType.associate = (models) => {
    UserRequestType.hasMany(models.UserRequest, { foreignKey: 'userRequestTypeId' });
  }

  return UserRequestType;
};