const Product = require("../models/Product");
const ProductPhotos = require("../models/ProductPhotos");

module.exports = {
  async index(req, res) {
    const { id_product } = req.params;

    const product = await Product.findByPk(id_product,{
        include : { association: 'photos'}
    });
    if (!product) return res.status(400).json({ error: "Product not found" });

    return res.json(product);
  },
  async store(req, res) {
    const { id_product } = req.params;
    const { name, key, url } = req.body;

    const product = await Product.findByPk(id_product);
    if (!product) return res.status(400).json({ error: "Product not found" });

    const photos = await ProductPhotos.create({
      name,
      key,
      url,
      id_product
    });

    return res.json(photos);
  }
};
