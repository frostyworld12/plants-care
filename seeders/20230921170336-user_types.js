const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await db.UserTypes.bulkCreate([
      { name: 'Admin' },
      { name: 'Content Manager' }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await db.UserTypes.bulkDelete('UserTypes');
  }
};
