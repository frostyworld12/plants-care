module.exports = (sequelize, Sequelize) => {
  const UsersRequests = sequelize.define("UsersRequests", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    description: {
      type: Sequelize.TEXT
    }
  });

  UsersRequests.associate = (models) => {
    UsersRequests.belongsTo(models.Users, { foreignKey: 'userId' });
    UsersRequests.belongsTo(models.Plants, { foreignKey: 'plantId' });
    UsersRequests.hasOne(models.RequestTypes, { foreignKey: 'requestTypeId' });
  }

  return UsersRequests;
};