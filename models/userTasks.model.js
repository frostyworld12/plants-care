module.exports = (sequelize, Sequelize) => {
  const UserTasks = sequelize.define("UserTasks", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    operationName: {
      type: Sequelize.STRING
    },
    operationDate: {
      type: Sequelize.DATEONLY
    }
  });

  UserTasks.associate = (models) => {
    UserTasks.belongsTo(models.UserPlant, { foreignKey: 'plantId' });
    UserTasks.belongsTo(models.User, { foreignKey: 'userId' });
  }

  return UserTasks;
};