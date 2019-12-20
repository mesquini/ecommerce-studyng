const Product = require("../models/Product");
const aws = require("aws-sdk");
const { Op } = require("sequelize");
const s3 = new aws.S3();

module.exports = {
  async index(req, res) {
    const { page = 1, paginate = 5 } = req.query;

    const options = {
      //attributes: ['id', 'name'],
      page, // Default 1
      paginate, // Default 25
      order: [["name", "ASC"]],
      where: {},
      include: { association: "photos", limit: 1, attributes: ["url"] }
    };

    const products = await Product.paginate(options);

    return res.json(products);
  },
  async store(req, res) {
    const { name, quantity, price } = req.body;

    const product = await Product.create({ name, quantity, price });

    return res.json(product);
  },
  async update(req, res) {
    const { name, quantity, price } = req.body;
    const updated_at = new Date();

    await Product.update(
      { name, quantity, price, updated_at },
      {
        where: { id: req.params.id_product }
      }
    );

    return res.send();
  },
  async search(req, res) {
    const { searchInput = "" } = req.params;
    const { page = 1, paginate = 5 } = req.query;

    const options = {
      //attributes: ['id', 'name'],
      page, // Default 1
      paginate, // Default 25
      order: [["name", "ASC"]],
      where: { name: { [Op.iLike]: `%${searchInput}%` } },
      include: { association: "photos", limit: 1, attributes: ["url"] }
    };

    const products = await Product.paginate(options);

    return res.json(products);
  },
  async delete(req, res) {
    const product = await Product.findByPk(req.params.id_product, {
      include: { association: "photos" }
    });

    await product.photos.forEach(element => {
      s3.deleteObject({
        Bucket: "mesquini",
        Key: element.key
      }).promise();
    });

    await product.destroy();

    return res.send();
  }
};
