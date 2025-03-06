'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trajets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      station_depart_id: {
        type: Sequelize.INTEGER
      },
      station_arrivee_id: {
        type: Sequelize.INTEGER
      },
      distance_km: {
        type: Sequelize.FLOAT
      },
      duree_estimee: {
        type: Sequelize.INTEGER
      },
      tarif: {
        type: Sequelize.FLOAT
      },
      latitude_depart: {
        type: Sequelize.FLOAT
      },
      longitude_depart: {
        type: Sequelize.FLOAT
      },
      latitude_arrivee: {
        type: Sequelize.FLOAT
      },
      longitude_arrivee: {
        type: Sequelize.FLOAT
      },
      itineraire_google_maps: {
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
    await queryInterface.dropTable('Trajets');
  }
};