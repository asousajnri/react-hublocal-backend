const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        hooks: {
          beforeSave: async (user) => {
            user.password = await bcrypt.hash(user.password, 8);
          },
        },
      }
    );
  }

  static generateToken(id, password) {
    return jwt.sign(
      {
        id,
        password,
      },
      process.env.APP_SECRET
    );
  }

  static checkPassword(password, password_hash) {
    return bcrypt.compare(password, password_hash);
  }

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: "user_id", as: "tasks" });
  }
}

module.exports = User;
