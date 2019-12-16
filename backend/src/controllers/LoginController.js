const { Crypt } = require("../crypto/crypto");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    const { email, pass } = req.body;
    
    const CryptPass = await Crypt(pass);
    
    const { id } = await User.findOne({ where: { email, pass: CryptPass } });
    if (!id) return res.json({ status: "user not found" });

    var token = jwt.sign({ id }, process.env.SECRETY_KEY, {});
    return res.status(200).send({ auth: true, token: token });
  },
  async logout(req, res){
      return res.status(200).send({ auth: false, token: null });
  }
};
