const { user, post } = require("../../models")
const { isAuthorized } = require("../tokenFunc")

module.exports = async (req, res) => {
    if (req.file) {
        await user.update(
            {
                profilePhoto: req.file.filename,
            },
            { where: { user_id: req.body.user_id } }
        )
        res.send({
            fileName: req.file.filename,
        })
    }
}
