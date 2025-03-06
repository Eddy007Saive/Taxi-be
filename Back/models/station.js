'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Station.hasMany(models.Trajet, { foreignKey: 'station_depart_id', as: 'departTrajets' });
      Station.hasMany(models.Trajet, { foreignKey: 'station_arrivee_id', as: 'arriveeTrajets' });
    }
  }
  Station.init({
    nom: DataTypes.STRING,
    ville: DataTypes.STRING,
    adresse: DataTypes.STRING,
    telephone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Station',
  });
  return Station;
};