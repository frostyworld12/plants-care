module.exports = (sequelize, Sequelize) => {
  const RequestType = sequelize.define("RequestType", {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  RequestType.associate = (models) => {
    RequestType.hasMany(models.UserRequest, { foreignKey: 'requestTypeId' });
  }

  return RequestType;
};