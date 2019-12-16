const Product = require("../models/Product");
const ProductPhotos = require("../models/ProductPhotos");
const aws = require("aws-sdk");
const s3 = new aws.S3();

module.exports = {
  async index(req, res) {
    const { id_product } = req.params;

    const product = await Product.findByPk(id_product, {
      include: { association: "photos" }
    });
    if (!product) return res.status(400).json({ error: "Product not found" });

    return res.json(product);
  },
  async store(req, res) {
    const { originalname: name, size, key, location: url = "" } = req.file;
    const { id_product } = req.params;

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
  },
  async delete(req, res) {
    const photo = await ProductPhotos.findByPk(req.params.id_photo);

    s3.deleteObject({
      Bucket: "mesquini",
      Key: photo.key
    }).promise();

    await photo.destroy();

    return res.send();
  }
};
