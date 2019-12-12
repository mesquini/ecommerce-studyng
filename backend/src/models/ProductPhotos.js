const { Model, DataTypes } = require("sequelize");

class ProductPhotos extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        key: DataTypes.STRING,
        url: DataTypes.STRING,
        size: DataTypes.INTEGER
      },
      {
        sequelize
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: "id_product",
      as: "Product"
    });
  }
}

module.exports = ProductPhotos;
