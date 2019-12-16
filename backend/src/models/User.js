const { Model, DataTypes } = require("sequelize");
const paginateSequelize = require("sequelize-paginate");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        pass: DataTypes.STRING,
        email: DataTypes.STRING,
        adm: DataTypes.BOOLEAN
      },
      {
        sequelize,
        tableName: "users"
      }
    );
  }
}

paginateSequelize.paginate(User);

module.exports = User;
