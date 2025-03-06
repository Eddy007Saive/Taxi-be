'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Voyages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicule_id: {
        type: Sequelize.INTEGER
      },
      chauffeur_id: {
        type: Sequelize.INTEGER
      },
      trajet_id: {
        type: Sequelize.INTEGER
      },
      date_depart: {
        type: Sequelize.DATE
      },
      heure_depart: {
        type: Sequelize.TIME
      },
      heure_arrivee_estimee: {
        type: Sequelize.TIME
      },
      places_disponibles: {
        type: Sequelize.INTEGER
      },
      statut: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Voyages');
  }
};