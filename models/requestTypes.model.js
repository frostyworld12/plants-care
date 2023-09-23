module.exports = (sequelize, Sequelize) => {
  const RequestTypes = sequelize.define("RequestTypes", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  RequestTypes.associate = (models) => {
    RequestTypes.hasMany(models.UsersRequests, { foreignKey: 'requestTypeId' });
  }

  return RequestTypes;
};