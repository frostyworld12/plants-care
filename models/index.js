'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Users         = require('./users.model')(sequelize, Sequelize);
db.UserTypes     = require('./userTypes.model')(sequelize, Sequelize);
db.UsersPlants   = require('./usersPlants.model')(sequelize, Sequelize);
db.UsersRequests = require('./usersRequests.model')(sequelize, Sequelize);
db.RequestTypes  = require('./requestTypes.model')(sequelize, Sequelize);
db.Plants        = require('./plants.model')(sequelize, Sequelize);
db.PlantsCare    = require('./plantsCare.model')(sequelize, Sequelize);
db.PlantsTypes   = require('./plantsTypes.model')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
