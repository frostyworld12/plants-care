module.exports = (sequelize, Sequelize) => {
  const PlantType = sequelize.define("PlantType", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  PlantType.associate = (models) => {
    PlantType.hasMany(models.Plant, { foreignKey: 'plantTypeId' });
  }

  return PlantType;
};