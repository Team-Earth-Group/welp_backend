'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return [
      queryInterface.addColumn('businesses', 'imageUrl', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('businesses', 'description', {
        type: Sequelize.TEXT,
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return [
      queryInterface.removeColumn('businesses', 'imageUrl'),
      queryInterface.removeColumn('businesses', 'description')
    ];
  }
};
