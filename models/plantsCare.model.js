module.exports = (sequelize, Sequelize) => {
  const PlantCare = sequelize.define("PlantCare", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    operations: {
      type: Sequelize.TEXT
    }
  });

  PlantCare.associate = (models) => {
    PlantCare.hasMany(models.Plant, { foreignKey: 'plantCareId' });
  }

  return PlantCare;
};