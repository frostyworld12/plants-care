module.exports = (sequelize, Sequelize) => {
  const PlantsCare = sequelize.define("PlantsCare", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    frequency: {
      type: Sequelize.STRING
    }
  });

  PlantsCare.associate = (models) => {
    PlantsCare.hasMany(models.Plants, { foreignKey: 'plantsCareId' });
  }

  return PlantsCare;
};