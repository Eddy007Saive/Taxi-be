'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voyage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Voyage.belongsTo(models.Chauffeur, { foreignKey: 'chauffeur_id' });
     Voyage.belongsTo(models.Trajet, { foreignKey: 'trajet_id' });
     Voyage.hasMany(models.Reservation, { foreignKey: 'voyage_id' });
     
    }
  }
  Voyage.init({
    vehicule_id: DataTypes.INTEGER,
    chauffeur_id: DataTypes.INTEGER,
    trajet_id: DataTypes.INTEGER,
    date_depart: DataTypes.DATE,
    heure_depart: DataTypes.TIME,
    heure_arrivee_estimee: DataTypes.TIME,
    places_disponibles: DataTypes.INTEGER,
    statut: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Voyage',
  });
  return Voyage;
};