/* eslint-disable */
import { useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import Comment from "./8.postRead-comment"

const Outer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #FFF9EE;
`

const Contents = styled.div`
    width: 100%;
    background-color: #FFF9EE;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PostReadSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    width: 80%;

    & > div {
        margin: 1rem;
    }

    & .postPic {
        width: 60%;
        height: 60%;
    }

    & .postContent {
        font-size: 1.2rem;
        padding: 1rem;
        width: 90%;
    }
`

const PostTitle = styled.div`
    width: 100%;
    & h1 {
        margin: auto 1rem;
    }

    @media screen and (max-width: 930px) {
        display: block;
        & h1 {
            font-size: 1.5rem;
        }
    }
`
// 제목
const PostTitleLeft = styled.div`
    align-items: center;
    padding-bottom: 1rem;
    margin-bottom: 0.8rem;
    border-bottom: 1px solid #588156;
    
    @media screen and (max-width: 930px) {
        justify-content: space-between;
        display: inline-block;
        width: 100%;
        .title {
            display: inline;
            margin: 0;
        }
    }
`

// 날짜, 수정,삭제버튼
const PostRight = styled.div`
    display: flex;
    justify-content: space-between;
`
// 날짜
const Date = styled.div`
    line-height: 50px;
    vertical-align: middle;
    @media screen and (max-width: 651px) {
        font-size: 0.8rem;
    }

`
// 삭제,수정
const Buttons = styled.div`
    & button {
        font-size: 1.1rem;
        font-weight:bold;
        padding: 0.5rem 2rem;
        margin: 0.5rem;
        color: white;
        border-radius: 10px;
    }

    & .editPost {
        background-color:white; 
        color: #588156;
        &:hover{
            background-color: #FFBC57;
            color:white;
        }
    }

    & .deletePost {
        background-color: #588156;
        color:white;
        &:hover{
            background-color:#E55432; 
            color: #006300;
        }
    }
    @media screen and (max-width: 651px) {
        button {
            font-size: 0.8rem;
            padding: 0.5rem 1rem;
        }
    }
`

const CommentSection = styled.div`
    width: 80%;
    padding: 1rem;
    & li {
        padding: 1rem;
        margin: 0.5rem;
    }
`

// 댓글달기
const PostComment = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #588156;

    span {
        font-weight: bold;
        font-size: 1.2rem;
        margin-right: 1rem;
    }

    & .commentUsername {
        display: flex;
        font-size: 0.8rem;
        & .username {
            font-weight: bold;
            margin-right: 0.5rem;
        }
        & .inputTitle {
            margin-right: 0.5rem;
        }
    }

    & input {
        width: 70%;
        padding: 0.5rem;
        font-size: 1rem;
        margin-right: 1rem;
    }

    & button {
        background-color: #588156;
        width: 95px;
        height: 40px;
        padding: 0;
        border-radius: 10px;
        font-size: 1.2rem;
        font-weight: bold;
        color: #FFFFFF;
        &:hover{
            background-color: #FFBC57;
            color: #FFFFFF;
        }
        @media screen and (max-width: 651px) {
            width: 5rem;
            height: 3rem;
            font-size: 0.8rem;
        }
        @media screen and (max-width: 450px) {
            /* width: 4rem; */
            height: 2.5rem;
        }
    }
`

const CommentList = styled.ul`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`

const BackButton = styled.button`
    font-weight: bold;
    text-decoration: underline;
    background-color: transparent;
    color: #7b7b7b;
    font-size: 1rem;
    margin: 1rem;
    padding: 0.8rem;

    @media screen and (max-width: 800px) {
        margin: 0;
        padding: 0;
    }
`

const PhotoBoxZone = styled.img`
    align-items: center;
    width: 100%;
    height: 100%;
`

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export default function PostRead(props) {
    const history = useHistory()

    function editPostButton() {
        axios({
            url: url + "/editpost",
            method: "patch",
            data: {
                post_id: props.curPost.id, //클릭한 포스트 id
                user_id: props.userinfo.user_id, //현재접속한 유저정보
                post_title: props.curPost.post_title,
                post_img: props.curPost.post_img,
                post_content: props.curPost.post_content,
            },
            withCredentials: true,
        }).then((res) => {
            alert(res.data)
            if (res.data === "게시물 작성자가 아닙니다.") {
                history.push("/mainpage")
            } else {
                history.push("/editpost")
            }
        })
    }

    useEffect(() => {
        handleButtonClick2()
    }, [])

    // title - 삭제 :
    const deletePostButton = (event) => {
        const token = JSON.parse(localStorage.getItem("accessToken"))

        axios({
            url: url + "/deletepost",
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${token}`,
            },
            data: { post_id: props.curPost.id },
            withCredentials: true,
        }).then((res) => {
            alert(res.data)
            history.push("/mainpage")
        })
    }

    // 뒤로 버튼
    const backButtonHandler = () => {
        history.goBack()
        history.goBack()
    }

    // 댓글
    const [contentMsg, setContentMsg] = useState(null) // 작성되어지는 댓글 (input)
    const [contentList, setContentList] = useState([]) // 댓글 목록

    // 댓글작성 버튼
    function handleButtonClick() {
        axios({
            url: url + "/sendcomment",
            method: "post",
            data: {
                post_id: props.curPost.id,
                comment_user_id: props.userinfo.user_id,
                comment_content: contentMsg,
            },
            withCredentials: true,
        }).then((res) => {
            handleButtonClick2()
        })
    }

    function handleButtonClick2() {
        axios({
            url: url + "/commentlist",
            method: "post",
            data: {
                post_id: props.curPost.id,
                comment_user_id: props.userinfo.user_id,
            },
            withCredentials: true,
        }).then((res) => setContentList(res.data))
    }

    // 댓글 삭제
    const deleteComment = (commentId) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            axios({
                url: url + "/deletecomment",
                method: "delete",
                data: {
                    post_id: props.curPost.id, 
                    comment_id: commentId,
                },
                withCredentials: true,
            }).then((res) => {
                // 추후 수정 필요 12/06
                history.push("/mainpage")
                history.goBack()
            })
        }
    }

    // 댓글내용
    const handleChangeMsg = (event) => {
        setContentMsg(event.target.value)
    }

    //랜덤이미지 
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    return (
        <Outer>
            <Contents>
                <PostReadSection>
                    <PostTitle className="postTitle">
                        <PostTitleLeft className="postTitle_left">
                            <h1 className="title">
                                {props.curPost.post_title}
                            </h1>
                        </PostTitleLeft>

                        <PostRight className="postTitle_right">
                            <Date><p>{props.curPost.updatedAt}</p></Date>
                            <Buttons>
                                <button
                                    className="editPost"
                                    onClick={editPostButton}
                                >
                                    수정
                                </button>
                                <button
                                    className="deletePost"
                                    onClick={deletePostButton}
                                >
                                    삭제
                                </button>
                            </Buttons>
                        </PostRight>
                    </PostTitle>

                     {/* 게시물 사진 */}
                    <div className="postPic">
                        <PhotoBoxZone
                            className="picture"
                            src={url + props.curPost.post_img}
                            alt="게시물 사진"
                        />
                    </div>

                    {/* 게시물 내용 */}
                    <div className="postContent">
                        {props.curPost.post_content}
                    </div>

                    {/* 뒤로 버튼 */}
                    <BackButton
                        className="backButton"
                        onClick={backButtonHandler}
                    >
                        Back
                    </BackButton>
                </PostReadSection>

                {/* 댓글 작성 */}
                <CommentSection>
                    <PostComment className="postComment">
                        <div><span>{props.userinfo.user_id}</span></div>
                        <input
                            className="inputComment"
                            type="text"
                            placeholder="댓글을 작성해주세요."
                            onChange={handleChangeMsg}
                        />
                        <button onClick={handleButtonClick}>작성</button>
                    </PostComment>

                    {/* 댓글 목록 */}
                    <CommentList className="commentsList">
                        {contentList.map((content) => (
                            <Comment
                                key={content.id}
                                content={content}
                                deleteComment={deleteComment}
                            />
                        ))}
                    </CommentList>
                </CommentSection>
            </Contents>
        </Outer>
    )
}
