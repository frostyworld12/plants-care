module.exports = (sequelize, Sequelize) => {
  const UserType = sequelize.define("UserType", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  UserType.associate = (models) => {
    UserType.hasMany(models.User, { foreignKey: 'userTypeId' });
  }

  return UserType;
};