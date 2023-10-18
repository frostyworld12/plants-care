const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await db.UserType.bulkCreate([
      { name: 'Admin' },
      { name: 'Content Manager' }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await db.UserType.bulkDelete('UserTypes');
  }
};
