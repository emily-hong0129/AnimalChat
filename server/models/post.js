"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
   
    static associate(models) {
     
      models.post.hasMany(models.comment, {foreignKey: "post_id", sourceKey: "id"})
      models.post.belongsTo(models.user, {foreignKey: "user_id", targetKey: "user_id"})
    }
  }
  post.init(
    {
      user_id: DataTypes.STRING,
      post_title: DataTypes.STRING,
      post_content: DataTypes.STRING,
      post_img: DataTypes.STRING,
      animalcategory: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "post",
    }
  )
  return post
}
