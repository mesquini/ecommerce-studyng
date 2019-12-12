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
    const { originalname:name, size, key, location: url = "" } = req.file;
    const { id_product } = req.params;
    console.log("url -> "+url);
    
    const product = await Product.findByPk(id_product);
    if (!product) return res.status(400).json({ error: "Product not found" });

    const photos = await ProductPhotos.create({
      name,
      size,
      key,
      url,
      id_product
    });

    return res.json(photos);
  }
};
