module.exports = (sequelize, Sequelize) => {
  const Plant = sequelize.define("Plant", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    origin: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING
    }
  });

  Plant.associate = (models) => {
    Plant.belongsTo(models.PlantType, { foreignKey: 'plantTypeId' });
    Plant.belongsTo(models.PlantCare, { foreignKey: 'plantCareId' });
    Plant.hasMany(models.UserPlant, { foreignKey: 'plantId' });
    Plant.hasMany(models.UserRequest, { foreignKey: 'plantId' });
  }

  return Plant;
};