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
      // Associations avec Trajet
      Station.hasMany(models.Trajet, { foreignKey: 'station_depart_id', as: 'trajetsDepart' });
      Station.hasMany(models.Trajet, { foreignKey: 'station_arrivee_id', as: 'trajetsArrivee' });
    }
  }
  Station.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ville: DataTypes.STRING,
    adresse: DataTypes.STRING,
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    est_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    code: DataTypes.STRING,
    description: DataTypes.TEXT,
    horaires_ouverture: DataTypes.STRING,
    contact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Station',
  });
  return Station;
};