const { animal } = require("../../models")

module.exports = async (req, res) => {

    await animal.destroy({
        where: {
            userId: req.body.userId,
            id: req.body.id,
        },
    })
    res.send("delete ok")
}
