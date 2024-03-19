// Define the Role model with attributes like title, salary, department ID, etc.

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'department',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role',
  }
);

module.exports = Role;

