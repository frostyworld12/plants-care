module.exports = (sequelize, Sequelize) => {
  const UserTasksHistory = sequelize.define("UserTasksHistory", {
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
    },
    taskId: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
    },
    isNewTaskCreated: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  UserTasksHistory.associate = (models) => {
    UserTasksHistory.belongsTo(models.UserPlant, { foreignKey: 'plantId' });
    UserTasksHistory.belongsTo(models.User, { foreignKey: 'userId' });
  }

  return UserTasksHistory;
};