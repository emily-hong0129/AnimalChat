/* eslint-disable */
import axios from "axios"
import styled from "styled-components"
import AnimalInfo from "../components/AnimalInfo"
import AddAnimalInfo from "../components/AddAnimalInfo"
import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

const Outer = styled.div`
    background-color: #feefd5;
    height: 100vh;
`

const IdDisplay = styled.div`
    box-sizing: content-box;
    padding: 1rem;
    display: flex;
    justify-content: center;
`

const AnimalsList = styled.div`
    box-sizing: content-box;
    padding: 1rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, 350px);
    justify-content: center;
    align-content: center;
`

const ButtonsArea = styled.div`
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    & > button {
        font-size: 1rem;
        background-color: #db7092;
        color: white;
        font-weight: bold;
        box-sizing: content-box;
        margin: 0.5rem;
    }
`

const QuitButton = styled.button`
    background-color: transparent;
    border-radius: none;
    text-decoration: underline;
    border: none;
    color: #aaaaaa;
`

const AddAnimalModalContainer = styled.div`
    box-sizing: content-box;
    padding: 1rem;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, 350px);
    justify-content: center;
    align-content: center;
`

const AddAnimalModalBackDrop = styled.div`
    position: fixed;
    display: grid;
    place-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`
const AddAnimalModalView = styled.div`
    display: flex;
    flex-direction: column;
    // justify-content: center;
    justify-content: space-around;
    border-radius: 20px;
    background-color: #feefd5;
    min-width: 400px;
    // width: 40vw;
    // height: 60vw;
    width: 500px;

    height: 600px;
    color: #bd2020;
    font-size: 1.5rem;
    font-weight: bold;

    // & button.close {
    //     display: flex;
    //     justify-content: flex-end;
    //     margin-top: 1rem;
    //     padding: 0.5rem 2rem;
    //     font-size: 2rem;
    //     text-decoration: underline;
    //     color: #7b7b7b;
    //     border: none;
    //     background-color: transparent;
    // }
`

const ButtonSpace1 = styled.div`
    display: flex;
    justify-content: center;
    // align-items: center;
`
const ButtonSpace2 = styled.div`
    display: flex;
    justify-content: space-around;
    // align-items: center;

    & button {
        width: 110px;
        border: none;
        border-radius: 2rem;
        margin: auto 0.5rem;
        padding: 0.5rem 1rem;
        background-color: #ffb83e;
        color: red;
        font-size: 1.2rem;

        &:hover {
            color: black;
            background-color: red;
        }
    }
`
const Button = styled.button`
    // margin-top: 2rem;
    // margin-right: 5.5rem;
`

const Buttos = styled.button`
    // margin-right: 5rem;
    // margin-top: 2rem;
`
const PhotoBoxAndIdDisplay = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const PhotoBox = styled.img`
    width: 250px;
    height: 250px;

    border-radius: 50%;
    border: 1px solid silver;
`
const PhotoBox2 = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100%;
`
const PhotoBox3 = styled.div`
    display: flex;
    justify-content: center;

    position: relative;
`
const CameraImg = styled.label`
    position: relative;
`
const CameraImg2 = styled.img`
    width: 50px;
    margin-left: 70px;

    position: absolute;
    bottom: 20px;

    background-color: white;
    border-radius: 100%;
    border: 1px solid silver;
`

const FormInputTag = styled.input`
    display: none;
`
const DivTag1 = styled.div``
const DivTag2 = styled.div`
    color: black;
    font-size: 1.5rem;
    font-weight: normal;
`
const DivTag3 = styled.div`
    margin: 20px;
    font-size: 1.2rem;

    color: #b6b6b6;
    font-weight: normal;
`

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export default function MyPageSection(props) {
    const infoAnimal = props.userinfo

    const [isOpen, setIsOpen] = useState(false)
    const [removeUsers, setremoveUsers] = useState(false)

    const history = useHistory()

    const [userAnimalinfo, setUserAnimalInfo] = useState([])
    useEffect(() => {
        axios({
            url: url + `/userinfo?serchAnimalInfo=${props.userinfo.user_id}`,
            method: "get",
            withCredentials: true,
        }).then((res) => {
            setUserAnimalInfo(res.data)
        })
    }, [])

    function addAnimal() {
        setIsOpen(!isOpen)
    }

    function deleteUserInfo() {
        setremoveUsers(true)
    }

    function pwdChange(click) {
        history.push("/editpw")
    }

    function closeRemoveModal() {
        //취소하기 버튼으로
        setremoveUsers(false)
        history.push("/mypage")
    }

    const removeInfomation = () => {
        axios({
            url: url + "/removeuser",
            method: "delete",
            withCredentials: true,
        }).then((res) => {
            alert("회원탈퇴가 완료되었습니다.")
            history.push("/firstpage")
        })
    }

    // 동물추가 후 모달창 닫히는 함수
    const addButtonHandler = () => {
        setIsOpen(false)
        renderreset()
    }
    const renderreset = () => {
        history.push("/")
        history.push("/mypage")
    }
    // 추가 취소
    const cancleButton = () => {
        setIsOpen(false)
    }

    const [photo, setPhoto] = useState("")
    const [uploadedImg, setUploadedImg] = useState({
        fileName: null,
        filePath: null,
    })
    const [formBox, setformBox] = useState("")

    useEffect(() => {
        const formData = new FormData()
        formData.append("img", photo)
        formData.append("user_id", props.userinfo.user_id)

        setformBox(formData)
    }, [photo])
    useEffect(() => {
        if (formBox !== "") {
            axios
                .post(url + "/profilephoto", formBox, {
                    "Content-Type": "application/json",
                    withCredentials: true,
                })
                .then((res) => {
                    const { fileName } = res.data
                    setUploadedImg({
                        fileName,
                        filePath: `${url}/img/${fileName}`,
                    })
                    props.newUserInfo()
                    alert("사진을 성공적으로 업로드 하였습니다.")
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [formBox])

    const addFile = async (e) => {
        await setPhoto(e.target.files[0])
    }
    useEffect(() => {
        setUploadedImg({
            fileName: props.userinfo.profilePhoto,
            filePath: `${url}/img/${props.userinfo.profilePhoto}`,
        })
    }, [])

    return (
        <Outer className="MyPageSection">
            <PhotoBoxAndIdDisplay>
                <PhotoBox2 className="PhotoBox2">
                    <PhotoBox
                        className="PhotoBox1-1"
                        src={uploadedImg.filePath}
                    />
                </PhotoBox2>
                <PhotoBox3>
                    <CameraImg htmlFor="fileId">
                        <CameraImg2 src="../img/camera.png" />
                    </CameraImg>
                </PhotoBox3>
                <IdDisplay>
                    <span>{props.userinfo.user_id}</span>
                </IdDisplay>
                <FormInputTag
                    type="file"
                    id="fileId"
                    onChange={addFile}
                ></FormInputTag>
            </PhotoBoxAndIdDisplay>
            <AnimalsList>
                {userAnimalinfo.length ? (
                    userAnimalinfo.map((animalcard) => {
                        return (
                            <AnimalInfo
                                key={animalcard.id}
                                animalcard={animalcard}
                            />
                        )
                    })
                ) : (
                    <div>정보없음</div>
                )}
            </AnimalsList>
            <ButtonsArea>
                <button onClick={addAnimal}>동물 추가하기</button>
                <button onClick={pwdChange}>비밀번호 수정</button>
                <QuitButton onClick={() => deleteUserInfo()}>
                    회원탈퇴
                </QuitButton>
            </ButtonsArea>

            {isOpen === false ? null : (
                <AddAnimalModalContainer>
                    <AddAnimalModalBackDrop>
                        <AddAnimalModalView>
                            <AddAnimalInfo
                                infoAnimal={infoAnimal}
                                addButtonHandler={addButtonHandler}
                                cancleButton={cancleButton}
                            >
                                나는 모달
                            </AddAnimalInfo>
                        </AddAnimalModalView>
                    </AddAnimalModalBackDrop>
                </AddAnimalModalContainer>
            )}
            {removeUsers ? (
                <AddAnimalModalContainer>
                    <AddAnimalModalBackDrop>
                        <AddAnimalModalView className={"3"}>
                            <ButtonSpace1>
                                <h1>회원탈퇴</h1>
                            </ButtonSpace1>
                            <DivTag1>
                                <ButtonSpace1>
                                    <DivTag2>탈퇴 전 유의 사항</DivTag2>{" "}
                                </ButtonSpace1>
                                <DivTag3>
                                    -탈퇴시 회원정보가 삭제되며, 복구가
                                    불가합니다.
                                </DivTag3>
                                <DivTag3>
                                    -재가입시에도 복구가 불가능합니다.
                                </DivTag3>
                                <DivTag3>
                                    -회원가입 정보는 완전 삭제 되지만, 일부
                                    작성게시글과 작성댓글은 남아 있을 수
                                    있습니다.
                                </DivTag3>
                                <DivTag3>
                                    -작성글, 작성댓글의 삭제를 원하신다면
                                    탈퇴전에 모두 삭제처리를 선행해주세요.
                                </DivTag3>
                            </DivTag1>
                            <ButtonSpace2>
                                <Button onClick={() => closeRemoveModal()}>
                                    아니오
                                </Button>
                                <Buttos onClick={() => removeInfomation()}>
                                    예
                                </Buttos>
                            </ButtonSpace2>
                        </AddAnimalModalView>
                    </AddAnimalModalBackDrop>
                </AddAnimalModalContainer>
            ) : null}
        </Outer>
    )
}