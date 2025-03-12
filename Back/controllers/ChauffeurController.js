const {Chauffeur} = require("../models")
class ChauffeurController {
  async create(req, res) {
    try {
      const chauffeur = await Chauffeur.create(req.body);
      res.status(201).json(chauffeur);
    } catch (error) {
      console.error("Erreur lors de la création de la Chauffeur:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async all(req, res) {
    try {
      const chauffeur = await Chauffeur.findAll();
      res.status(200).json(chauffeur);
    } catch (error) {
      console.error("Erreur lors de la création de la Chauffeur:", error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ChauffeurController();
