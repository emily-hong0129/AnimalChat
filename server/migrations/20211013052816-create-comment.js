"use strict"
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("comments", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            comment_user_id: {
                type: Sequelize.STRING,
            },
            comment_content: {
                type: Sequelize.STRING,
            },
            post_id: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("comments")
    },
}
