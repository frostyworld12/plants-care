const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    const userTypes = await db.UserTypes.findAll({raw: true});

    const userTypePerId = userTypes.reduce((userTypePerId, type) => {
      userTypePerId[type.name] = type.id;
      return userTypePerId;
    }, {});

    await db.Users.bulkCreate([
      {
        email: 'admin_user@gmail.com',
        password: 'admin',
        firstName: 'Admin',
        lastName: 'Admin',
        userTypeId: userTypePerId.Admin
      },
      {
        email: 'content_manager_user@gmail.com',
        password: '12345',
        firstName: 'Manager',
        lastName: 'Manager',
        userTypeId: userTypePerId['Content Manager']
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await db.Users.bulkDelete('UserTypes');
  }
};
