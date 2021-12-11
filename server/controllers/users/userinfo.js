const { user } = require("../../models")
const { animal } = require("../../models")
const { isAuthorized } = require("../tokenFunc")

module.exports = (req, res) => {
    const { serchAnimalInfo } = req.query

    animal
        .findAll({
            where: { userId: serchAnimalInfo },
        })
        .then((useranimaldata) => {
            if (!useranimaldata) {
                res.status(422).send("반려동물 없음")
            }
            // 반려동물 정보 보이기
            res.status(222).send(
                useranimaldata.map((element) => {
                    return element.dataValues
                })
            )
        })
}
