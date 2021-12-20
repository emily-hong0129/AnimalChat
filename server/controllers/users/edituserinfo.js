const { user } = require("../../models")
const { animal } = require("../../models")
const { generateAccessToken, generateRefreshToken } = require("../tokenFunc")

module.exports = async (req, res) => {
    const animal_photo = req.body.animal_photo
    const { userId, animalName, animalYob, selectType } = req.body.animalInfo

    if (!userId || !animalName || !animalYob || !selectType) {
        res.status(401).send("정보를 모두 기입해야합니다.")
    } else {
        await animal.create({
            userId: userId,
            animaltype: selectType,
            animalname: animalName,
            animalyob: animalYob,
            animal_photo: animal_photo,
        })
        res.status(201).send({ message: "ok" })
    }
}
