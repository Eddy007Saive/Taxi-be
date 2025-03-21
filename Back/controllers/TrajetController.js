const {Trajet,Station}=require("../models")

class TrajetController {
  async create(req, res) {
    try {
      const trajet = await Trajet.create(req.body);
      res.status(201).json(trajet);
    } catch (error) {
      console.error("Erreur lors de la création de la trajet:", error);
      res.status(400).json({ error: error.message });
    }
  }

  async all(req, res) {
    try {
      const trajet = await Trajet.findAll({
        include:[
          {model:Station,as :"stationArrivee"},
          {model:Station,as :"stationDepart"}]
      });
      res.status(200).json(trajet);
    } catch (error) {
      console.error("Erreur lors de la récupretation  des trajets:", error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports=new TrajetController();
