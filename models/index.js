'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User         = require('./users.model')(sequelize, Sequelize);
db.UserType     = require('./userTypes.model')(sequelize, Sequelize);
db.UserPlant   = require('./usersPlants.model')(sequelize, Sequelize);
db.UserRequest = require('./usersRequests.model')(sequelize, Sequelize);
db.RequestType  = require('./requestTypes.model')(sequelize, Sequelize);
db.Plant        = require('./plants.model')(sequelize, Sequelize);
db.PlantCare   = require('./plantsCare.model')(sequelize, Sequelize);
db.PlantType   = require('./plantsTypes.model')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
