'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trajet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Trajet.belongsTo(models.Station, { foreignKey: 'station_depart_id', as: 'stationDepart' });
     Trajet.belongsTo(models.Station, { foreignKey: 'station_arrivee_id', as: 'stationArrivee' });
     Trajet.hasMany(models.Voyage, { foreignKey: 'trajet_id' });
     
    }
  }
  Trajet.init({
    station_depart_id: DataTypes.INTEGER,
    station_arrivee_id: DataTypes.INTEGER,
    distance_km: DataTypes.FLOAT,
    duree_estimee: DataTypes.INTEGER,
    tarif: DataTypes.FLOAT,
    latitude_depart: DataTypes.FLOAT,
    longitude_depart: DataTypes.FLOAT,
    latitude_arrivee: DataTypes.FLOAT,
    longitude_arrivee: DataTypes.FLOAT,
    itineraire_google_maps: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trajet',
  });
  return Trajet;
};