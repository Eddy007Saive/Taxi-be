const {Trajet}=require("../models")
class TrajetController {
  async create(req, res) {
    try {
      const trajet = await Trajet.create(req.body);
      res.status(201).json(trajet);
    } catch (error) {
      console.error("Erreur lors de la création de la station:", error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports=new TrajetController();
