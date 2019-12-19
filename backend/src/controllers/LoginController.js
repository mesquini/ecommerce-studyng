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
  async logout(req, res) {
    return res.status(200).send({ auth: false, token: null });
  },
  async verify_token(req, res) {
    const { token } = req.params;
    
    jwt.verify(token, process.env.SECRETY_KEY, function(err, decoded) {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
    });

    const user = await User.findByPk(req.userId);

    return res.json(user);
  }
};
