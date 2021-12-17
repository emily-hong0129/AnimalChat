const { user } = require("../../models")
const { isAuthorized } = require("../tokenFunc")
const { encrypto } = require("../users/setpw")

module.exports = async (req, res) => {
    const accessTokenData = isAuthorized(req)

    if (!accessTokenData) {
        res.status(401).send("로그인 정보를 확인해주세요.")
    }

    const { user_id, nickname } = accessTokenData
    const { password } = req.body
    const enpw = encrypto(password)

    user.update(
        {
            password: enpw,
        },
        {
            where: {
                user_id: user_id,
                nickname: nickname,
            },
        }
    )
    res.status(201).send()
}
