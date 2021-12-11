"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class like extends Model {
     
        static associate(models) {
       
            models.like.belongsTo(models.user, {
                foreignKey: "user_id",
                targetKey: "id",
            })
            models.like.belongsTo(models.comment, {
                foreignKey: "comment_id",
                targetKey: "id",
            })
        }
    }
    like.init(
        {
            user_id: DataTypes.STRING,
            comment_id: DataTypes.STRING,
            post_id: DataTypes.STRING,
            postId: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "like",
        }
    )
    return like
}
