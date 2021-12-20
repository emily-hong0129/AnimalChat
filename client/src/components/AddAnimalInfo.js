import axios from "axios"
import { useState } from "react"
import styled from "styled-components"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

axios.defaults.withCredentials = true

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

const Outer = styled.div`
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    width: 350px;
    margin: 0 auto;
    color: black;
    font-size: 18px;
    font-weight: normal;
`

const PictureAndText = styled.div`
    display: flex;
`
// 사진 div
const PictureSpace = styled.form`
    display: block;
    flex: 1.5;
    justify-content: center;
    align-items: center;
`
const RoundPicture = styled.img`
    margin: 1rem auto;
    box-sizing: content-box;
    display: block;
    border-radius: 50%;
    width: 120px;
    height: 120px;
`
// 사진없을때
const NonePicture = styled.div`
    margin: 1rem auto;
    box-sizing: content-box;
    border-radius: 50%;
    background-color: #ffffff;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    p {
        vertical-align: middle;
    }
`

const TextSpace = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;

    & > div {
        margin: 5px 0;
    }

    p {
        margin: 0;
        padding: 0;
        font-size: 15px;
        font-weight: bold;
    }
`

const ButtonSpace = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
        width: 50px;
        height: 25px;
        line-height: 5px;
        font-weight: bold;
        border-radius: 10px;
        margin: 0;
    }
    #add {
        background-color: #588156;
        color: #ffffff;
        margin-right: 10px;
    }
    #cancle {
        background-color: #ffffff;
        color: #588156;
    }
`

const Button = styled.button`
    margin: 1rem;
`

const PhotoSelectBtn = styled.input`
    /* border: 1px solid red; */
    width: 100%;
`

const PhotoUpLoadBtn = styled.button`
    border: 1px solid gray;
    width: 72px;
    height: 20px;
    margin-top: 5px;
`

export default function AddAnimalInfo({
    infoAnimal,
    addButtonHandler,
    cancleButton,
}) {
    const [animalInfo, setAnimalInfo] = useState({
        userId: infoAnimal.user_id,
        animalName: "",
        animalYob: "",
    })

    const { animalName, animalYob } = animalInfo

    // 반려동물 type 선택
    const selectList = [
        "선택하세요",
        "햄스터",
        "병아리",
        "앵무새",
        "토끼",
        "고슴도치",
    ]
    const [Selected, setSelected] = useState("선택하세요")
    const handleSelect = (e) => {
        setSelected(e.target.value)
        setAnimalInfo({
            ...animalInfo,
            selectType: e.target.value,
        })
    }

    // 반려동물 출생년도
    const [startDate, serStartDate] = useState(new Date())

    function dateFormat(date) {
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month >= 10 ? month : "0" + month
        day = day >= 10 ? day : "0" + day

        return date.getFullYear() + "." + month + "." + day
    }

    // 입력창
    const handleInputValue = (e) => {
        setAnimalInfo({ ...animalInfo, [e.target.name]: e.target.value })
    }

    // 사진업로드
    const [photo, setPhoto] = useState("")
    const [uploadedImg, setUploadedImg] = useState({
        fileName: null,
        filePath: null,
    })

    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("img", photo)

        axios
            .post(url + "/animalphoto", formData, {
                "Content-Type": "multipart/form-data",
                withCredentials: true,
            })
            .then((res) => {
                const { fileName } = res.data
                setUploadedImg({ fileName, filePath: `${url}/img/${fileName}` })
                alert("사진을 성공적으로 업로드 하였습니다.")
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const addFile = (e) => {
        setPhoto(e.target.files[0])
    }

    // 추가버튼
    const addButton = () => {
        if (Selected && animalName && animalYob) {
            axios({
                url: url + "/edituserinfo",
                method: "patch",
                data: {
                    animalInfo: animalInfo,
                    animal_photo: "/img/" + uploadedImg.fileName,
                },
            }).then((res) => {
                alert("추가 완료")
                addButtonHandler()
            })
        } else {
            alert("모두 입력해주세요.")
        }
    }

    const closeModal = () => {
        cancleButton()
    }

    return (
        <div className="singleAnimalInfo">
            <Outer>
                <PictureAndText>
                    <PictureSpace onSubmit={onSubmit}>
                        {uploadedImg.filePath === null ? (
                            <NonePicture>
                                <p>사진 없음</p>
                            </NonePicture>
                        ) : (
                            <RoundPicture src={uploadedImg.filePath} />
                        )}
                        <PhotoSelectBtn type="file" onChange={addFile} />
                        <PhotoUpLoadBtn type="submit">
                            사진 업로드
                        </PhotoUpLoadBtn>
                    </PictureSpace>

                    <TextSpace>
                        <div>
                            <p>반려동물 종류</p>
                            <select onChange={handleSelect} value={Selected}>
                                {selectList.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <p>반려동물 이름</p>
                            <input
                                type="text"
                                name="animalName"
                                placeholder="이름"
                                onChange={handleInputValue}
                            />
                        </div>
                        <div>
                            <p>출생년도</p>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    serStartDate(date)
                                    setAnimalInfo({
                                        ...animalInfo,
                                        animalYob: dateFormat(date),
                                    })
                                }}
                            />
                        </div>
                    </TextSpace>
                </PictureAndText>
                <ButtonSpace>
                    <Button onClick={addButton} id="add">
                        추가
                    </Button>
                    <Button onClick={closeModal} id="cancle">
                        취소
                    </Button>
                </ButtonSpace>
            </Outer>
        </div>
    )
}
