module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING
    }
  });

  User.associate = (models) => {
    User.belongsTo(models.UserType, { foreignKey: 'userTypeId' });
    User.hasMany(models.UserPlant, { foreignKey: 'userId' });
    User.hasMany(models.UserRequest, { foreignKey: 'userId' });
    User.hasMany(models.UserTasks, { foreignKey: 'userId' });
    User.hasMany(models.UserTasksHistory, { foreignKey: 'userId' });
  }

  return User;
};