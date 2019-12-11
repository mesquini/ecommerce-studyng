const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Product = require('../models/Product')
const ProductPhotos = require('../models/ProductPhotos')

const connection = new Sequelize(dbConfig);

Product.init(connection)
ProductPhotos.init(connection)

Product.associate(connection.models)
ProductPhotos.associate(connection.models)

module.exports = connection;
