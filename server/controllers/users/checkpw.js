const { user } = require("../../models")
const { isAuthorized } = require("../tokenFunc")
//const { decrypto } = require("../users/setpw")
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    const accessTokenData = isAuthorized(req)

    if (!accessTokenData) {
        res.status(401).send("로그인 정보를 확인해주세요.")
    }

    const { user_id, nickname } = accessTokenData
    const { password } = req.body

    user.findOne({
        where: {
            user_id: user_id,
            nickname: nickname,
        },
    }).then((data) => {
        //const depw = decrypto(data.password)
        const compares = bcrypt.compare(password, data.password)

        if (!data) {
            res.send("확인되지 않은 사용자입니다.")
        }
        // if (depw !== password) {
        //     res.send("비밀번호가 맞지 않습니다.")
        // }
        if(!compares){
            res.status(404).send("비밀번호 확인불가")
        }
        delete data.dataValues.password
        res.status(201).send("비밀번호 확인 완료")
    })
}
