const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await db.UserRequestType.bulkCreate([
      { name: 'In review' },
      { name: 'Approved' },
      { name: 'Canceled' }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await db.UserRequestType.bulkDelete('UserRequestType');
  }
};
