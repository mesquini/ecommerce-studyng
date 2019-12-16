const User = require("../models/User");
const { Crypt } = require("../crypto/crypto");

module.exports = {
  async index(req, res) {
    const { id_user } = req.params;

    const user = await User.findByPk(id_user);

    return res.json(user);
  },
  async store(req, res) {
    const { name, pass, email, isAdm } = req.body;

    const passCrypt = await Crypt(pass);

    const user = await User.create({ name, pass: passCrypt, email, isAdm });

    return res.json(user);
  },
  async update(req, res) {
    const { name, pass, email, isAdm } = req.body;
    const { id_user } = req.params;
    const updated_at = new Date();

    await User.update(
      { name, pass, email, isAdm, updated_at },
      {
        where: { id: id_user }
      }
    );

    return res.send();
  },
  async delete(req, res) {
    const user = await User.findByPk(req.params.id_user);

    await user.destroy();

    return res.send();
  }
};
