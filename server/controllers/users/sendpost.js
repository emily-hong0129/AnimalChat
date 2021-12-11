const { user, post } = require("../../models")
const { isAuthorized } = require("../tokenFunc")

module.exports = async (req, res) => {
    const accessTokenData = isAuthorized(req)

    if (!accessTokenData) {
        return res.json({
            data: null,
            message: "회원정보가 일치하지 않습니다.",
        })
    }

    const { post_title, post_content } = req.body

    if (req.file) {
        res.send({
            fileName: req.file.filename,
        })
    } else if (!post_title || !post_content) {
        res.status(401).send("제목과 내용 사진은 필수입니다.")
    } else {
        post.create({
            user_id: req.body.user_id,
            post_title: req.body.post_title,
            post_content: req.body.post_content,
            post_img: req.body.post_img,
            animalcategory: req.body.animalcategory,
        })
        res.status(200).send({ message: "ok" })
    }
}
