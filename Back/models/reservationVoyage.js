'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReservationVoyage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Définissez vos associations ici si nécessaire
      // La plupart du temps, les associations belongsToMany sont définies dans 
      // les modèles principaux (Reservation et Voyage)
    }
  }
  ReservationVoyage.init({
    // Clés étrangères (seront ajoutées automatiquement si vous utilisez belongsToMany,
    // mais c'est une bonne pratique de les déclarer explicitement)
    ReservationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reservations', // nom de la table, pas du modèle
        key: 'id'
      },
      allowNull: false
    },
    VoyageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Voyages', // nom de la table, pas du modèle
        key: 'id'
      },
      allowNull: false
    },
    // Vos autres attributs
    numero_place: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_reserve: {
      type: DataTypes.DATE,
      allowNull: false
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ReservationVoyage',
  });
  return ReservationVoyage;
};