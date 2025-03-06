'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehicule.belongsTo(models.Chauffeur, { foreignKey: 'chauffeur_id' });
      
    }
  }
  Vehicule.init({
    immatriculation: DataTypes.STRING,
    marque: DataTypes.STRING,
    modele: DataTypes.STRING,
    capacite: DataTypes.INTEGER,
    statut: DataTypes.STRING,
    chauffeur_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicule',
  });
  return Vehicule;
};