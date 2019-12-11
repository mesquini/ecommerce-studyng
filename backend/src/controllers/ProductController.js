const Product = require("../models/Product");

module.exports = {
  async index(req, res) {

    const {page, paginate = 5} = req.query

    const options = {
        //attributes: ['id', 'name'],
        page, // Default 1
        paginate, // Default 25
        order: [['name', 'ASC']],
        where: {  }
      }

    const products = await Product.paginate(options)

    return res.json(products);
  },
  async store(req, res) {
    const { name, quantity } = req.body;

    const product = await Product.create({ name, quantity });

    return res.json(product);
  }
};
