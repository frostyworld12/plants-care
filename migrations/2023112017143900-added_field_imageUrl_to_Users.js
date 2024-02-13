'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'imageUrl', {
        type: Sequelize.STRING
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn (
      'Users',
      'imageUrl'
    );
  }
};
