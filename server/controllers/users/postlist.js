const { post } = require("../../models")
const { user } = require("../../models")

module.exports = async (req, res) => {
    // 해당 동물의 작성된 게시판 목록을 보여줌
    let data = await post.findAll({})
    let data2 = await user.findAll({})

    for (let n = 0; n < data.length; n++) {
        for (let m = 0; m < data2.length; m++) {
            if (
                String(data[n].dataValues.user_id) ===
                String(data2[m].dataValues.user_id)
            ) {
                data[n].dataValues["postUserPhoto"] =
                    data2[m].dataValues.profilePhoto
                break
            }
        }
    }
    res.send(data)
}
