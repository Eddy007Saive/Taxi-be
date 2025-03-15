const {User}=require("../models")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
class UserController {
  async register(req, res) {
    const existingUser=await User.findOne({email:req.body.email})
    if(existingUser){
      return res.status(400).json({message:"Utilisateur déja existant"})
    }

    try {
      
      const hashedPassword= await bcrypt.hash(req.body.mot_de_passe,10)
      const newUser=new User({
        nom:req.body.nom,
        prenom:req.body.prenom,
        email:req.body.email,
        mot_de_passe:hashedPassword
  
      })
  
      await User.create(newUser);
      return res.status(201).json({message:"Utilisateur Crée"});
    } catch (error) {

      return res.status(500).json({message:error});
      
    }
    
  }

  async verifyToken(req,res,next){
      const token=req.headers["authorization"]
      if(!token){
        return res.status(401).json({error:"Unothorized"})
      }

      jwt.verify(token,'secret',(err,decoded)=>{
        if(err){
           return res.status(401).json({error:"Unothorized"})
        }
        req.user=decoded
        next();
      })
  }

  async login(req,res){
    try {
      
      const user=await User.findOne({email:req.body.email})
      if(!user){
        return res.status(401).json({error:"Invalid credential"})
  
      }
  
      const passwordMacth=await bcrypt.compare(req.body.mot_de_passe,user.mot_de_passe)
      if(!passwordMacth){
        return res.status(401).json({error:"Invalid credential"})
  
      }
  
      const token=jwt.sign({email:user.email},'secret')
      return res.status(200).json({token})
    } catch (error) {
      return res.status(500).json({error:"Internal server error"})
      
    }


  }
}

module.exports=new UserController();
