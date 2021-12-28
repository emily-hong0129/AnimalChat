const { user } = require("../../models")
const { animal } = require("../../models")
const { generateAccessToken, generateRefreshToken } = require("../tokenFunc")
//const { encrypto } = require("../users/setpw")
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    const { userId, password, nickName, animalName, selectType, animalYob } =
        req.body

    //정보 6가지가 모두 없었을 경우 클라이언트 에러 리턴
    if (
        !userId ||
        !password ||
        !nickName ||
        !animalName ||
        !selectType ||
        !animalYob
    ) {
        res.status(401).send("정보를 모두 기입해야합니다.")
    }
    //6가지 정보가 정상일경우 중
    else {
        //id가 조회
        const userInfo = await user.findOne({
            where: {
                user_id: userId,
            },
        })
        const userNickInfo = await user.findOne({
            where: {
                nickname: nickName,
            },
        })

        // id가 이미 있는 사람인 경우
        if (userInfo) {
            res.status(202).send({ message: "이미 가입되어 있는 회원의 경우" })
        }
        //id중복이 아니지만, 닉이 중복인경우
        else if (!userInfo && userNickInfo) {
            res.status(203).send({
                message: "닉네임을 다른사용자가 사용중인경우",
            })
        }
        //id도 중복아니고, 닉네임도 중복이 아닌경우 생성해준다.
        else {
            //const enpw = encrypto(password)
            const hash = await bcrypt.hash(password, 13)
            //users테이블에 가입정보 추가
            await user.create({
                user_id: userId,
                //password: enpw,
                password:hash,
                nickname: nickName,
                profilePhoto: "chick.png",
            })
            await animal.create({
                userId: userId,
                animaltype: selectType,
                animalname: animalName,
                animalyob: animalYob,
            })
            res.status(201).send({ message: "ok" })
        }
    }
}
