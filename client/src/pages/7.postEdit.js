/* eslint-disable */
import { useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import Header from "../components/Header"
import Navigation from "../components/Navigation"

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff9ee;
    width: 100%;
    height: 100vh;
    @media screen and (max-width: 1080px) {
        width: 100%;
        height: 100%;
    }
`

const ContentBox = styled.div`
    background-color: #fff9ee;
    padding: 2rem;
    width: 80vw;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1080px) {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`

//사진업로드 배경div
const PhotoUploadSection = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1080px) {
        width: 50%;
        margin-left: 10%;
        margin-top: 2%;
    }
`

const PhotoBox = styled.div`
    min-width: 300px;
    width: 30vh;
    height: 30vh;
    background-color: #ececec;
    font-size: 30px;
    color: palevioletred;
    border: 1px solid #b5b5b5;
    @media screen and (max-width: 1080px) {
        width: 90%;
        height: 205px;
    }
`

const PhotoBoxZone = styled.img`
    max-width: 100%;
    @media screen and (max-width: 1080px) {
        width: 90%;
        height: 205px;
        margin-left: 5%;
    }
`
//PhotoUploadWarning
const PhotoBoxDiv = styled.div`
    margin-top: 200px;
    background-color: #ececec;
    font-size: 30px;
    text-align: center;
    color: palevioletred;
`

//사진 업로드 버튼 div
const PhotoUploadButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
    padding: 1rem;
    @media screen and (max-width: 1080px) {
        width: 120%;
        margin-top: 0.2px;
        height: 2.2rem;
    }
`

//파일선택버튼
const PhotoSelectBtn = styled.input`
    text-align: center;
    font-size: 1.2rem;
    width: 17rem;
    height: 3rem;
    margin-top: 1rem;
    @media screen and (max-width: 1080px) {
        width: 80%;
        font-size: 1rem;
    }
`

//사진 재업로드 버튼
const PhotoUpLoadBtn = styled.button`
    color: white;
    font-weight: bold;
    border-radius: 2rem;
    text-align: center;
    font-size: 1.2rem;
    width: 7vw;
    background-color: #9fd9f4;
    padding: 1rem;
    &:hover {
        background-color: #95e4fe;
    }
    @media screen and (max-width: 1080px) {
        width: 40%;
        font-size: 1rem;
        height: 0.55rem;
        padding-top: 0.5rem;
    }
`

const TitlePostDiv = styled.div`
    margin: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40vw;
    height: 35vh;
    @media screen and (max-width: 1080px) {
        margin-top: 3%;
        margin-left: 10%;
        padding: 0.5rem;
    }
`

//제목
const TitleBox = styled.input`
    border: 1px solid #b5b5b5;
    margin-bottom: 40px;
    width: inherit;
    height: 50px;
    background-color: #ececec;
    font-size: 1.9rem;
    color: palevioletred;
    text-align: center;
    padding: 0.5rem;
    @media screen and (max-width: 1080px) {
        width: 250px;
        margin-left: 13%;
        font-size: 1rem;
        margin-top: 0.3rem;
        height: 20px;
    }
`
//글
const PostBox = styled.textarea`
    border: 1px solid #b5b5b5;
    width: inherit;
    height: 400px;
    background-color: #ececec;
    font-size: 1.8rem;
    color: palevioletred;
    padding: 0.5rem;
    text-align: center;
    @media screen and (max-width: 1080px) {
        width: 250px;
        margin-left: 13%;
        font-size: 1rem;
        height: 500px;
    }
`

//수정 취소 버튼div
const TitlePostButtons = styled.div`
    margin: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80%;
    @media screen and (max-width: 1080px) {
        width: 100%;
        margin-left: 25%;
        margin-top: 1%;
        margin-bottom: 0.1rem;
    }
`

//수정버튼
const PostCompletionBtnMargin = styled.button`
    text-align: center;
    background-color: white;
    color: #588156;
    padding: 1rem 3rem;
    margin: 0.2rem;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 2rem;
    &:hover {
        background-color: #ffbc57;
        color: white;
    }
    @media screen and (max-width: 1080px) {
        font-size: 0.8rem;
        padding: 1rem;
        margin: 0.5rem;
    }
`

//취소버튼
const PostCancelBtnMargin = styled.button`
    text-align: center;
    background-color: #588156;
    color: white;
    padding: 1rem 3rem;
    margin: 0.2rem;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 2rem;
    &:hover {
        background-color: #e55432;
        color: #006300;
    }
    @media screen and (max-width: 1080px) {
        font-size: 0.8rem;
        padding: 1rem;
        margin: 0.5rem;
    }
`

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-202-229.ap-northeast-2.compute.amazonaws.com"

export const PostEdit = (props) => {
    const history = useHistory()
    // 1. input title, content
    // 2. 제목과 내용 필수, 사진은 선택으로 함
    const [inputTitle, setInputTitle] = useState("")
    const [inputContent, setInputContent] = useState("")
    const [photo, setPhoto] = useState("")
    const [uploadedImg, setUploadedImg] = useState({
        fileName: null,
        filePath: null,
    })
    const [photoChange, setPhotoChange] = useState(false)

    useEffect(() => {
        setUploadedImg({
            fileName: props.curPost.post_img,
            filePath: `${url}${props.curPost.post_img}`,
        })
        setInputTitle(props.curPost.post_title)
        setInputContent(props.curPost.post_content)
    }, [])

    // 작성되어지는 제목, 내용
    const handleInputValue = (e) => {
        if (e.target.name === "title") {
            setInputTitle(e.target.value)
        } else if (e.target.name === "content") {
            setInputContent(e.target.value)
        }
    }

    // 작성 버튼
    // 수정된 게시물 정보 -> 서버로
    // 수정 페이지 postread에서 보여야함
    const postSendButton = () => {
        if (
            inputTitle.length > 0 &&
            inputContent.length > 0 &&
            uploadedImg.fileName &&
            photoChange
        ) {
            axios({
                url: url + "/editpost",
                method: "patch",
                data: {
                    user_id: props.userinfo.user_id,
                    post_id: props.curPost.id,
                    post_title: inputTitle,
                    post_content: inputContent,
                    post_img: "/img/" + uploadedImg.fileName,
                    animalcategory: props.curAnimal,
                },
                withCredentials: true,
            })
                .then(() => {
                    alert("수정 완료(사진수정포함)")
                    // 작성 완료
                    history.push("/mainpage")
                })
                .catch((err) => console.log(err))
        }
        //사진은 안바꾸고 제목과 내용만 변경
        else if (
            inputTitle.length > 0 &&
            inputContent.length > 0 &&
            !photoChange
        ) {
            axios({
                url: url + "/editpost",
                method: "patch",
                data: {
                    user_id: props.userinfo.user_id,
                    post_id: props.curPost.id,
                    post_title: inputTitle,
                    post_content: inputContent,
                    post_img: props.curPost.post_img,
                    animalcategory: props.curAnimal,
                },
                withCredentials: true,
            })
                .then(() => {
                    alert("작성 완료")
                    // 작성 완료
                    history.push("/mainpage")
                })
                .catch((err) => console.log(err))
        } else {
            alert("제목과 내용은 필수사항 입니다.")
        }
    }
    // 취소 버튼
    const cancleButton = () => {
        history.goBack()
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("img", photo)
        setPhotoChange(true)

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

    return (
        <Body>
            <Header
                setIsLogin={props.setIsLogin}
                setUserinfo={props.setUserinfo}
            />
            <Navigation />
            <ContentBox>
                <PhotoUploadSection onSubmit={onSubmit}>
                    <PhotoBox>
                        {uploadedImg ? (
                            <div className="uploadedImage">
                                <PhotoBoxZone
                                    src={uploadedImg.filePath}
                                    alt=""
                                />
                            </div>
                        ) : (
                            <PhotoBoxDiv className="photoUploadWarning">
                                아래 파일 추가를 눌러주세요.
                            </PhotoBoxDiv>
                        )}
                    </PhotoBox>

                    <PhotoUploadButtons className="photoSelectButtons">
                        <PhotoSelectBtn
                            type="file"
                            className="photoButton"
                            onChange={addFile}
                        />
                        <PhotoUpLoadBtn type="submit">재업로드</PhotoUpLoadBtn>
                    </PhotoUploadButtons>
                </PhotoUploadSection>

                <TitlePostDiv>
                    <TitleBox
                        value={inputTitle}
                        type="text"
                        name="title"
                        onChange={handleInputValue}
                    />
                    <PostBox
                        type="text"
                        name="content"
                        onChange={handleInputValue}
                        value={inputContent}
                    />
                    <TitlePostButtons>
                        <PostCompletionBtnMargin onClick={postSendButton}>
                            수정
                        </PostCompletionBtnMargin>
                        <PostCancelBtnMargin onClick={cancleButton}>
                            취소
                        </PostCancelBtnMargin>
                    </TitlePostButtons>
                </TitlePostDiv>
            </ContentBox>
        </Body>
    )
}

export default PostEdit
