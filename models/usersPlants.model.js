module.exports = (sequelize, Sequelize) => {
  const UsersPlants = sequelize.define("UsersPlants", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    }
  });

  UsersPlants.associate = (models) => {
    UsersPlants.belongsTo(models.Plants, { foreignKey: 'plantId' });
    UsersPlants.belongsTo(models.Users, { foreignKey: 'userId' });
  }

  return UsersPlants;
};