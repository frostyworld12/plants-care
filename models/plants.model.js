module.exports = (sequelize, Sequelize) => {
  const Plants = sequelize.define("Plants", {
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

  Plants.associate = (models) => {
    Plants.belongsTo(models.PlantsTypes, { foreignKey: 'plantTypeId' });
    Plants.belongsTo(models.PlantsCare, { foreignKey: 'plantsCareId' });
    Plants.hasMany(models.UsersPlants, { foreignKey: 'plantId' });
    Plants.hasMany(models.UsersRequests, { foreignKey: 'plantId' });
  }

  return Plants;
};