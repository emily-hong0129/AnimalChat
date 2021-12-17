import { useHistory } from "react-router-dom"
import React, { useState } from "react"
import styled from "styled-components"
import axios from "axios"
import Header from "../components/Header"
import Navigation from "../components/Navigation"

// 화면에 보이는 부분 전체
const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff9ee;
    width: 100%;
    height: 100vh;
    @media screen and (max-width: 1080px){
        width: 100%;
        height: 100%;
    }
`

// 사진 업로드, 글 수정 전체
const ContentBox = styled.div`
    background-color:#fff9ee;
    padding: 2rem;
    width: 80vw;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 1080px){
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`

const PhotoUploadSection = styled.form`
    margin: auto 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 1080px){
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
    @media screen and (max-width: 1080px){
      width: 90%;
      height: 205px;
     }
`
const PhotoBoxZone = styled.img`
    max-width: 100%;
    @media screen and (max-width: 1080px){
      width: 90%;
      height: 205px;
      margin-left: 5%;
     }
`

const PhotoUploadWarning = styled.div`
    margin-top: 200px;
    /* background-color: #ececec; */
    font-size: 30px;
    text-align: center;
    color: #e00000;
`

const PhotoUploadButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
    padding: 0.1rem;
    margin-right:2rem;
    @media screen and (max-width: 1080px){
      width: 120%;
      margin-left: 8%;
      margin-top: 3%;
     }
`

const PhotoSelectBtn = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.1rem;
    font-size: 1.2rem;
    @media screen and (max-width: 1080px){
      font-size: 0.9rem;
     }
`

//업로드 버튼
const PhotoUpLoadBtn = styled.button`
    border-radius:3rem;
    font-size: 20px;
    padding: 0.5rem;
    color: white;
    text-align: center;
    width: 100px;
    background-color: #9FD9F4;
    font-weight: bold;
    font-size: 1.3rem;
    &:hover{
        background-color:#95E4FE;
    }
    @media screen and (max-width: 1080px){
      width: 80%;
      font-size: 1rem;
     }
`

// 타이틀, 글 작성 버튼 2개 포함
const TitlePostDiv = styled.div`
    margin: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40vw; 
    height: 45vh; 
    @media screen and (max-width: 1080px){
      margin-top: 10%;
      margin-left: 7%;
     }
`

const TitleBox = styled.input`
    border: 1px solid #b5b5b5;
    margin-bottom: 40px;
    width: inherit;
    height: 50px;
    background-color: #ececec;
    font-size: 30px;
    color: palevioletred;
    text-align: center;
    padding: 0.5rem;
    @media screen and (max-width: 1080px){
      width: 250px;
      margin-left: 13%;
      font-size: 1rem;
      margin-top: 1rem;
     }
`

const PostBox = styled.textarea`
    border: 1px solid #b5b5b5;
    width: inherit;
    height: 400px;
    background-color: #ececec;
    font-size: 30px;
    color: palevioletred;
    padding: 0.5rem;
    text-align: center;
    @media screen and (max-width: 1080px){
      width: 250px;
      margin-left: 13%;
      font-size: 1rem;
     }
`

const TitlePostButtons = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: inherit;
    text-align: center;
    margin-top: 2rem;
    @media screen and (max-width: 1080px){
      margin-left: 13%;
     }
`

const PostCompletionBtnMargin = styled.button`
    text-align: center;
    background-color: white;
    color: #588156;
    padding: 1rem 3rem;
    margin: 0.2rem;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 2rem;
    &:hover{
        background-color:#FFBC57;
        color: white;
    }
    @media screen and (max-width: 1080px){
      font-size: 0.8rem;
      padding: 1rem;
     }
`

const PostCancelBtnMargin = styled.button`
    text-align: center;
    background-color: #588156;
    color: white;
    padding: 1rem 3rem;
    margin: 0.2rem; 
    font-weight: bold;
    font-size: 1rem;
    border-radius: 2rem;
    &:hover{
        /* background-color:#FF9075; */
        background-color:#FF9075;
        color: #588156;
    }
    @media screen and (max-width: 1080px){
      font-size: 0.8rem;
      padding: 1rem;
     }
`

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export const Post = (props) => {
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
            inputContent.length > 0
        ) {
            axios({
                url: url + "/sendpost",
                method: "post",
                data: {
                    user_id: props.userinfo.user_id,
                    post_title: inputTitle,
                    post_content: inputContent,
                    post_img: "/img/" + uploadedImg.fileName,
                    animalcategory: props.curAnimal,
                },
                withCredentials: true,
            })
                .then(() => {
                    alert("작성 완료")
                    history.push("/mainpage")
                })
                .catch((err) => console.log(err))
        } else {
            alert("이미지와 제목, 내용 모두 필수사항 입니다.")
        }
    }
    // 취소 버튼
    const cancleButton = () => {
        // 해당 동물의 게시판으로 가야함
        history.goBack()
    }
 

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("img", photo)

        axios
            .post(url + "/sendpost", formData, {
                "Content-Type": "application/json",
                withCredentials: true,
            })
            .then((res) => {
                const { fileName } = res.data
                setUploadedImg({ fileName, filePath: `${url}/img/${fileName}` })
                alert("사진을 성공적으로 업로드 하였습니다.")
            })
            .catch((err) => {
                console.error("에러")
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
            <ContentBox className="contentBox">
    
                <PhotoUploadSection
                    onSubmit={onSubmit}
                    className="photoUploadSection"
                >
                    <PhotoBox className="photoBox">
                        {uploadedImg ? (
                            <div className="uploadedImage">
                                <PhotoBoxZone
                                    src={uploadedImg.filePath}
                                    alt=""
                                />
                          
                            </div>
                        ) : (
                            <PhotoUploadWarning className="photoUploadWarning">
                                아래 파일 추가를 눌러주세요.
                            </PhotoUploadWarning>
                        )}
                    </PhotoBox>
                    
                    <PhotoUploadButtons className="photoSelectButtons">
                        <PhotoSelectBtn
                            type="file"
                            className="photoButton"
                            onChange={addFile}
                        />
                  
                        <PhotoUpLoadBtn type="submit" className="photoButton">
                            업로드
                        </PhotoUpLoadBtn>
                    </PhotoUploadButtons>
                </PhotoUploadSection>
              
                <TitlePostDiv>
                    <TitleBox
                        placeholder="제목"
                        type="text"
                        name="title"
                        onChange={handleInputValue}
                    />
                    <PostBox
                        placeholder="글 내용"
                        type="text"
                        name="content"
                        onChange={handleInputValue}
                    />
                    <TitlePostButtons>
                        <PostCompletionBtnMargin onClick={postSendButton}>
                            작성
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

export default Post
