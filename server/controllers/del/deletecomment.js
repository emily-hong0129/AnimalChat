const { user, comment } = require("../../models")
const { isAuthorized } = require("../tokenFunc")
const commentlist = require("../users/commentlist")


module.exports = async (req, res) => {
    const accessTokenData = isAuthorized(req)
    const { user_id } = accessTokenData
    const userCheck = user.findOne({
        where: {
            user_id: user_id,
        },
    })

    if (!userCheck) {
        res.status(401).send("댓글을 삭제할 수 없습니다.")
    } else {
        comment.destroy({
            where: {
                comment_user_id: user_id,
                // 댓글 id로 삭제 test
                id: req.body.comment_id,
            },
        })
    }

    res.status(205).send()
}
