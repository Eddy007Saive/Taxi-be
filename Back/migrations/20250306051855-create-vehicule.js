'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehicules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      immatriculation: {
        type: Sequelize.STRING
      },
      marque: {
        type: Sequelize.STRING
      },
      modele: {
        type: Sequelize.STRING
      },
      capacite: {
        type: Sequelize.INTEGER
      },
      statut: {
        type: Sequelize.STRING
      },
      chauffeur_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Vehicules');
  }
};