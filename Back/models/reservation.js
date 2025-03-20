'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reservation.hasOne(models.Paiement, { foreignKey: 'reservation_id' });
      // Cette méthode crée automatiquement la table intermédiaire
      Reservation.belongsToMany(models.Voyage, { through: models.ReservationVoyage  });
      
    }
  }
  Reservation.init({
    user_id: DataTypes.INTEGER,
    voyage_id: DataTypes.INTEGER,
    nombre_places: DataTypes.INTEGER,
    montant_total: DataTypes.FLOAT,
    statut: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};