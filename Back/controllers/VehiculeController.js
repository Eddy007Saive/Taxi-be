
const {Vehicule}=require("../models")
class VehiculeController {
  async create(req, res) {
    try {
      const vehicule = await Vehicule.create(req.body)
      res.status(201).json(vehicule) 
    } catch (error) {
      console.error("Erreur lors de la creation vehicule:" ,error);
      res.status(400).json({ error: error.message });
    }
  }

  async all(req,res){
    try {
      const vehicules = await Vehicule.findAll();
      res.status(200).json(vehicules);
    } catch (error) {
      console.error("Erreur lors de la creation vehicule:" ,error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports= new VehiculeController();
