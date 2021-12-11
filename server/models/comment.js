"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
   
    static associate(models) {
    
      models.comment.belongsTo(models.user, {foreignKey: "comment_user_id", targetKey: "user_id"})
      models.comment.belongsTo(models.post, {foreignKey: "post_id", targetKey: "id"})
      models.comment.hasMany(models.like, {foreignKey: "comment_id", sourceKey: "id"})
    }
  }
  comment.init(
    {
      comment_user_id: DataTypes.STRING,
      comment_content: DataTypes.STRING,
      post_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "comment",
    }
  )
  return comment
}
