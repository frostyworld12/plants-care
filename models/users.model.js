module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("Users", {
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
    }
  });

  Users.associate = (models) => {
    Users.belongsTo(models.UserTypes, { foreignKey: 'userTypeId' });
    Users.hasMany(models.UsersPlants, { foreignKey: 'userId' });
    Users.hasMany(models.UsersRequests, { foreignKey: 'userId' });
  }

  return Users;
};