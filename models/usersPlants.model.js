module.exports = (sequelize, Sequelize) => {
  const UserPlant = sequelize.define("UserPlant", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    }
  });

  UserPlant.associate = (models) => {
    UserPlant.belongsTo(models.Plant, { foreignKey: 'plantId' });
    UserPlant.belongsTo(models.User, { foreignKey: 'userId' });
  }

  return UserPlant;
};