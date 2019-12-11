const { Model, DataTypes } = require("sequelize");
const paginateSequelize = require("sequelize-paginate");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        quantity: DataTypes.STRING
      },
      {
        sequelize
      }
    );
  }
  static associate(models) {       
    this.hasMany(models.ProductPhotos, {
      foreignKey: "id_product",
      as: "photos"
    });
  }
}
paginateSequelize.paginate(Product);

module.exports = Product;
