const {Station}=require("../models")
class StationController {
  async create(req, res) {
    try {
      const station = await Station.create(req.body);
      res.status(201).json(station);
    } catch (error) {
      console.error("Erreur lors de la création de la station:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async all(req, res) {
    try {
      const station = await Station.findAll();
      res.status(200).json(station);
    } catch (error) {
      console.error("Erreur lors de la création de la station:", error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports= new StationController();
