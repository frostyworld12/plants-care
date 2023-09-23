module.exports = (sequelize, Sequelize) => {
  const PlantsTypes = sequelize.define("PlantsTypes", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  PlantsTypes.associate = (models) => {
    PlantsTypes.hasMany(models.Plants, { foreignKey: 'plantTypeId' });
  }

  return PlantsTypes;
};