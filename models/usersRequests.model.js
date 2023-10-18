module.exports = (sequelize, Sequelize) => {
  const UserRequest = sequelize.define("UserRequest", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    description: {
      type: Sequelize.TEXT
    }
  });

  UserRequest.associate = (models) => {
    UserRequest.belongsTo(models.User, { foreignKey: 'userId' });
    UserRequest.belongsTo(models.Plant, { foreignKey: 'plantId' });
    UserRequest.hasOne(models.RequestType, { foreignKey: 'requestTypeId' });
  }

  return UserRequest;
};