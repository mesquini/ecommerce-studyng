const Product = require("../models/Product");
const aws = require("aws-sdk");
const s3 = new aws.S3();

module.exports = {
  async index(req, res) {
    const { page, paginate = 5 } = req.query;

    const options = {
      //attributes: ['id', 'name'],
      page, // Default 1
      paginate, // Default 25
      order: [["name", "ASC"]],
      where: {}
    };

    const products = await Product.paginate(options);

    return res.json(products);
  },
  async store(req, res) {
    const { name, quantity } = req.body;

    const product = await Product.create({ name, quantity });

    return res.json(product);
  },
  async update(req, res) {

    const { name, quantity } = req.body;

    await Product.update(
      { name, quantity },
      {
        where: { id: req.params.id_product }
      }
    );

    return res.send();
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
