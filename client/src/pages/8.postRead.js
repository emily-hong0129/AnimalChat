/* eslint-disable */
import { useHistory } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import Comment from "./8.postRead-comment"

const Outer = styled.div`
    width: 100vw;
    height: 100vh;
`

const Contents = styled.div`
    width: 100vw;
    background-color: #feefd5;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PostReadSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh; //추가
    margin-top: 0.5rem;

    & > div {
        margin: 5rem;
    }

    & .postPic {
        width: 50vw;
        height: 50vw;
    }

    & .postContent {
        font-size: 1.2rem;
        padding: 1rem;
        width: 90%;
        margin: 3rem;
    }
`

const PostTitle = styled.div`
    display: flex;
    width: calc(100% - 2rem);

    & h1 {
        margin: auto 1rem;
    }
`

const PostTitleLeft = styled.div`
    display: flex;
    flex-grow: 8;
    align-items: center;

    & img {
        border: 1px solid black;
        width: 3rem;
        height: 3rem;
    }
`

const PostButtons = styled.div`
    padding: 0;
    display: flex;
    flex-grow: 2;
    align-items: center;

    & button {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        font-size: 1rem;
        padding: 0.5rem;
        margin: 0.5rem;
        color: white;
    }
    & .editPost {
        flex-grow: 2;
        background-color: #4876bf;
        color: white;
    }
    & .deletePost {
        flex-grow: 1;
        background-color: #e00000;
    }
`

const CommentSection = styled.div`
    width: inherit;
    padding: 1rem;

    & li {
        padding: 1rem;
        margin: 0.5rem;
    }
`

const PostComment = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;

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
        background-color: #419300;
        padding: 0.5rem;
    }
`

const CommentList = styled.ul`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    width: inherit;
`

const BackButton = styled.button`
    font-weight: bold;
    text-decoration: underline;
    background-color: transparent;
    color: #7b7b7b;
    font-size: 1rem;
    margin: 1rem;
    padding: 0.8rem;
`

const PhotoBoxZone = styled.img`
    max-width: 100%;
`

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export default function PostRead(props) {
    const history = useHistory()

    function editPostButton(event) {
        axios({
            url: url + "/editpost",
            method: "post",
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

    // 댓글 삭제 (해당 유저 아이디만, )
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
                            <p>{props.curPost.updatedAt}</p>
                        </PostTitleLeft>

                        <PostButtons className="postTitle_right">
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
                        </PostButtons>
                    </PostTitle>

                    {/* 게시물 사진 */}
                    <div className="postPic">
                        {props.curPost.post_img.includes("png") ? (
                            <PhotoBoxZone
                                className="picture"
                                src={url + props.curPost.post_img}
                                alt="게시물 사진1"
                            />
                        ) : (
                            <PhotoBoxZone
                                className="picture"
                                src={`http://placeimg.com/640/${getRandomIntInclusive(
                                    480,
                                    640
                                )}/animals`}
                                alt="게시물 사진2"
                            />
                        )}
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
                        <div>{props.userinfo.user_id} 댓글달기:</div>
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
