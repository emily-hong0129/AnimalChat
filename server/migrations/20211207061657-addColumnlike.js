"use strict"

const { sequelize } = require("../models")

module.exports = {

  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('likes', 'post_id', Sequelize.INTEGER);
    await queryInterface.addConstraint('likes', {
      fields: ['post_id'],
      type: 'foreign key',
      name: 'custom_fkey_name',
      references: {
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade', 
      onUpdate: 'cascade'
    })
  },


    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeConstraint("likes", "custom_fkey_name")
        await queryInterface.removeColumn("likes", "post_id")
    },
}
