const { user } = require("../../models")
const { generateAccessToken, sendAccessToken } = require("../tokenFunc")
const { decrypto } = require("../users/setpw")
module.exports = (req, res) => {
    let accessToken = null
    user.findOne({
        where: {
            user_id: req.body.id,
        },
    }).then((data) => {
        const depw = decrypto(data.password)
        if (!data) {
            res.status(404).send("invalid user")
        }
        if (depw !== req.body.password) {
            res.status(404).send("비밀번호 확인불가")
        }

        delete data.dataValues.password
        accessToken = generateAccessToken(data.dataValues)

        res.cookie("jwt", accessToken, {
            httpOnly: true,
        })
            .status(200)
            .send({ accessToken: accessToken, message: "ok" })
    })
}
