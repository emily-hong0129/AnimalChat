/* eslint-disable */
import axios from "axios"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import likes from "../../src/icon/like.png"
import liked from "../../src/icon/liked.png"

const Like = styled.img`
    cursor: pointer;
    color: #aaa;
`

const CommentContainer = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .comment__left {
        margin-right: 1rem;
    }
    & .comment__userId {
        font-weight: bold;
        font-size: 1.2rem;
    }
    & .comment__content {
        margin: 0.5rem 0;
    }
    & .comment__createdAt {
        margin-top: 1rem;
        margin-right: 2rem;
    }
    & button {
        padding: 0.3rem 0.5rem;
        background-color: #FC8E57;
        border-radius: 10px;
    }

    @media screen and (max-width: 651px) {
    }
`

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

const Comment = ({ content, deleteComment, userinfo }) => {
    const [like, setLike] = useState(false)

    const likeHandler = async (e) => {
        axios({
            url: url + "/like",
            method: "post",
            data: {
                user_id: content.comment_user_id,
                comment_id: content.id,
                post_id: content.post_id,
            },
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }).then((res) => {
            setLike((data) => !data)
        })
    }

    useEffect(() => {
        axios({
            url: url + "/readlike",
            method: "post",
            data: {
                user_id: content.comment_user_id,
                comment_id: content.id,
                post_id: content.post_id,
            },
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }).then((res) => {
            if (res.data !== "댓글 좋아요 없음") {
                setLike(!like)
            }
        })
    }, [])

    return (
        <CommentContainer className="comment">
            <div className="comment__left">
                <p className="comment__userId">{content.comment_user_id}</p>

                <div className="comment__content">
                    <span>{content.comment_content}</span>
                </div>
                <span className="comment__createdAt">{content.createdAt}</span>
                <button
                    className="comment__removeBtn"
                    onClick={() => deleteComment(content.id)}
                >
                    삭제
                </button>
            </div>

            <div className="comment__right">
                {/* <span className="comment__createdAt">{content.createdAt}</span> */}
                <Like
                    like={like}
                    onClick={likeHandler}
                    src={like ? liked : likes}
                ></Like>
            </div>
        </CommentContainer>
    )
}

export default Comment;
