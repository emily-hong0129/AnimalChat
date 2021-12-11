"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class animal extends Model {
 
    static associate(models) {
      // define association here
     models.animal.belongsTo(models.user, {foreignKey: "userId", targetKey: "id"})
    }
  }
  animal.init(
    {
      userId: DataTypes.STRING,
      animaltype: DataTypes.STRING,
      animalname: DataTypes.STRING,
      animalyob: DataTypes.STRING,
      animal_photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "animal",
      paranoid: false
    }
  )
  return animal
}
