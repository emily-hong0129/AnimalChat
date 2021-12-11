const { like } = require("../../models");
const user = require("../../models/user");

module.exports = async (req, res) => {
  //res.send()
  //console.log("server/like---------",req.body)
  const { user_id, comment_id, post_id } = req.body;
  const liked = await like.findOne({
    where: {
      user_id: user_id, 
      comment_id: comment_id,
      post_id: post_id
    }
  })
  
  let likes; 
  if(liked){ //이미 좋아요가 있으면 해제 
    await liked.destroy();
    res.send("좋아요 해제")
  }
  else{ //좋아요가 없으면 눌림 
    likes = await like.create({
      user_id: user_id,
      comment_id: comment_id,
      post_id: post_id
    })
    
    res.send("좋아요 누름")
  }
}
