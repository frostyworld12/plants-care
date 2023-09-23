module.exports = (sequelize, Sequelize) => {
  const UserTypes = sequelize.define("UserTypes", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  UserTypes.associate = (models) => {
    UserTypes.hasMany(models.Users, { foreignKey: 'userTypeId' });
  }

  return UserTypes;
};