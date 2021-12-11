const { post } = require("../../models")

module.exports = async (req, res) => {
    const {
        user_id,
        post_id,
        post_title,
        post_content,
        post_img,
        animalcategory,
    } = req.body
    const checkUser = await post.findOne({
        where: {
            user_id: user_id,
            id: post_id,
        },
    })
    if (!checkUser) {
        res.send("게시물 작성자가 아닙니다.")
    } else {
        if (!post_title || !post_content) {
            res.send("제목과 내용은 필수로 수정해주세요.")
        } else {
            await post.update(
                {
                    post_title: post_title,
                    post_img: post_img,
                    post_content: post_content,
                },
                {
                    where: {
                        id: post_id,
                    },
                }
            )
            res.status(201).send("수정하시겠습니까?")
        }
    }
}
