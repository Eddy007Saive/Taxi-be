'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chauffeur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chauffeur.hasMany(models.Vehicule,{ foreignKey: 'chauffeur_id' })
      Chauffeur.hasMany(models.Voyage, { foreignKey: 'chauffeur_id' });
    }
  }
  Chauffeur.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    telephone: DataTypes.STRING,
    email: DataTypes.STRING,
    permis_numero: DataTypes.STRING,
    date_embauche: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Chauffeur',
  });
  return Chauffeur;
};