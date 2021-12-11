const { comment } = require("../../models")

module.exports = async (req, res) => {
    // 댓글 생성
    await comment.create({
        post_id: req.body.post_id,
        comment_user_id: req.body.comment_user_id,
        comment_content: req.body.comment_content,
    })

    res.status(205).send("OK")
}
