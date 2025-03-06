const {User}=require("../models")
class UserController {
  async create(req, res) {
    return res.json();
  }
}

module.exports=new UserController();
