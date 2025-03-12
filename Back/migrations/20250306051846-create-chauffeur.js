'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chauffeurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      photos: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      permis_numero: {
        type: Sequelize.STRING
      },
      date_embauche: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chauffeurs');
  }
};