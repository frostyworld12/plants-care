module.exports = (sequelize, Sequelize) => {
  const UsersPlants = sequelize.define("UsersPlants", {
  });

  UsersPlants.associate = (models) => {
    UsersPlants.belongsTo(models.Plants, { foreignKey: 'plantId' });
    UsersPlants.belongsTo(models.Users, { foreignKey: 'userId' });
  }

  return UsersPlants;
};