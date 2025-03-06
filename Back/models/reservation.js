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
      Reservation.belongsTo(models.Voyage, { foreignKey: 'voyage_id' });
      Reservation.hasOne(models.Paiement, { foreignKey: 'reservation_id' });
      
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