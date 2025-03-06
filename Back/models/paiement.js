'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paiement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Paiement.belongsTo(models.Reservation, { foreignKey: 'reservation_id' });
      
    }
  }
  Paiement.init({
    reservation_id: DataTypes.INTEGER,
    montant: DataTypes.FLOAT,
    methode: DataTypes.STRING,
    statut: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paiement',
  });
  return Paiement;
};