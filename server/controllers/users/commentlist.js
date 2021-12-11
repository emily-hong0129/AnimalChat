const { comment } = require("../../models")

module.exports = async (req, res) => {
    let commetList = await comment.findAll({
        where: {
            post_id: req.body.post_id,
        },
    })

    res.send(commetList)
}
