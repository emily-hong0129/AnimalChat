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
    background-color: #feefd5;
    width: 100vw;
    height: 100vh;
`

const ContentBox = styled.div`
    padding: 2rem;
    width: 90vw;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
`

const PhotoBox = styled.div`
    min-width: 300px;
    width: 30vh;
    height: 30vh;
    background-color: #ececec;
    font-size: 30px;
    color: palevioletred;
    border: 1px solid #b5b5b5;
`

const PhotoBoxDiv = styled.div`
    margin-top: 200px;
    background-color: #ececec;
    font-size: 30px;
    text-align: center;
    color: palevioletred;
`

const TitlePostDiv = styled.div`
    margin: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40vw;
    height: 35vh;
`

// 사진 업로드 버튼들
const TitlePostDiv2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffb83e;
    margin-top: 5rem;
`
const TitlePostDiv3 = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TitlePostDiv4 = styled.div`
    text-align: center;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    background-color: #ffb83e;
    margin-top: 5rem;
`
const PhotoSelectBtn = styled.input`
    text-align: center;
    font-size: 20px;
    width: 200px;
    height: 60px;
    background-color: #ffe2cd;
    color: palevioletred;
`

const PhotoSelectBtnMargin = styled.div`
    text-align: center;
    font-size: 20px;
    width: 200px;
    color: black;
`
const PhotoUpLoadBtn = styled.button`
    font-size: 20px;
    color: palevioletred;

    text-align: center;
    width: 200px;
    background-color: #419300;
    padding: 1rem;
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
`

const PostBox = styled.textarea`
    border: 1px solid #b5b5b5;
    width: inherit;
    height: 400px;
    background-color: #ececec;
    color: palevioletred;
    font-size: 30px;
    padding: 0.5rem;
`

const PostUploadBtn = styled.div``

const CancelBtn = styled.div``

const PostCompletionBtnMargin = styled.div`
    text-align: center;
    background-color: #4876bf;
    color: white;
    padding: 0.5rem 8rem;
    margin: auto 1rem;
`

const PostCancelBtnMargin = styled.div`
    text-align: center;
    background-color: #e00000;
    color: white;
    padding: 0.5rem 2rem;
`
const PhotoBoxZone = styled.img`
    max-width: 100%;
`

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

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
        //사진바꿨을경우
        if (
            inputTitle.length > 0 &&
            inputContent.length > 0 &&
            uploadedImg.fileName &&
            photoChange
        ) {
            // 제목, 내용 작성했을 때

            axios({
                url: url + "/editpost",
                method: "post",
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
        //사진은안바꾸고 제목과 내용만 변경
        else if (
            inputTitle.length > 0 &&
            inputContent.length > 0 &&
            !photoChange
        ) {
            axios({
                url: url + "/editpost",
                method: "post",
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
        // 해당 동물의 게시판으로 가야함
        history.goBack()
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("img", photo)
        setPhotoChange(true)

        axios
            .post(url + "/editpost", formData, {
                "Content-Type": "application/json",
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
                <TitlePostDiv3 onSubmit={onSubmit}>
                    <PhotoBox>
                        {uploadedImg ? (
                            <>
                                <PhotoBoxZone
                                    src={uploadedImg.filePath}
                                    alt=""
                                />
                            </>
                        ) : (
                            <PhotoBoxDiv>
                                아래 파일 추가를 눌러주세요.
                            </PhotoBoxDiv>
                        )}
                    </PhotoBox>
                    <TitlePostDiv2>
                        <PhotoSelectBtn type="file" onChange={addFile} />

                        <PhotoUpLoadBtn type="submit">
                            <PhotoSelectBtnMargin>
                                사진수정 버튼
                            </PhotoSelectBtnMargin>
                        </PhotoUpLoadBtn>
                    </TitlePostDiv2>
                </TitlePostDiv3>

                <TitlePostDiv>
                    <TitleBox
                        value={inputTitle}
                        type="text"
                        name="title"
                        onChange={handleInputValue}
                        // 수정 전의 제목이 들어와야함
                    />
                    <PostBox
                        placeholder="글을 적으세요."
                        type="text"
                        name="content"
                        onChange={handleInputValue}
                        value={inputContent}
                    />
                    <TitlePostDiv4>
                        <PostUploadBtn>
                            <PostCompletionBtnMargin onClick={postSendButton}>
                                수정
                            </PostCompletionBtnMargin>
                        </PostUploadBtn>
                        <CancelBtn>
                            <PostCancelBtnMargin onClick={cancleButton}>
                                취소
                            </PostCancelBtnMargin>
                        </CancelBtn>
                    </TitlePostDiv4>
                </TitlePostDiv>
            </ContentBox>
        </Body>
    )
}

export default PostEdit
