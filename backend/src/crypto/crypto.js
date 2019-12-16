require("dotenv").config();
const crypto = require("crypto");

const algorithm = process.env.ALGORITHM_TYPE;
const key = process.env.SECRETY_KEY;

async function Crypt(pass) {
  const cipher = crypto.createCipher(algorithm, key);
  const crypted = cipher.update(pass, "utf8", "hex");
  return crypted;
}

async function DesCrypt(pass) {
  const decipher = crypto.createDecipher(algorithm, key);
  const plain = decipher.update(pass, "hex", "utf8");
  return plain;
}
module.exports = {
  Crypt,
  DesCrypt
};
