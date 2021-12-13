import { useHistory } from "react-router-dom"
import styled from "styled-components"
import React from "react"

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

const StyledSinglePost = styled.div`
    display: grid;
    place-items: center center;
    padding: 0.35rem;
    width: 220px;
    height: 300px;
    background-color: #BD9C8C;
    border-radius: 10px;
    /* border: 1px solid #A06A50; */

    &:hover{
        transform: scale(1.03);
        transition: transform .3s;
    }
    
    @media screen and (max-width: 375px) {
        width: 130px;
        height: 160px;
    }
    @media screen and (max-width: 300px) {
        margin: 0 auto;
    }
`

const StyledThumbnail = styled.img`
    width: 175px;
    height: 175px;
    background-color: #ffd000;
    border-radius: 10%;

    @media screen and (max-width: 375px) {
        width: 80px;
        height: 80px;
    }
`

const StyledTitlePreview = styled.div`
    display: flex;
    /* height: 60px; */
    padding: 0.25rem;
    font-size: 0.9rem;
    color: #424242;

    & p {
        padding: 0.25rem;
        font-size: 0.9rem;
        color: #424242;
    }
    & p {
        padding: 0.25rem;
    }
    & .writer {
        font-size: 0.8rem;
    }

    @media screen and (max-width: 375px) {
        height: 30px;

        .title{
            font-size: 0.2rem;
            height: 70%;
        }
    }
`

const StyledProfilePictureArea = styled.div`
`
const DivTag = styled.div`
    width: 50px;
    height: 50px;
    @media screen and (max-width: 375px) {
        width: 30px;
        height: 30px;
    }
`
const ImgvTag = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`

export default function SinglePostOnBoard({ mockBgColor, post, curPostRead }) {
    const history = useHistory()

    function postRead() {
        curPostRead(post)
        history.push("/readpost")
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    return (
        // <div className="singlePostOnBoard">
            <StyledSinglePost>
                {post.post_img.includes("png") ? (
                    <StyledThumbnail
                        src={url + post.post_img}
                        onClick={() => postRead(post)}
                    />
                ) : (
                    <StyledThumbnail
                        src={post.post_img}
                        onClick={() => postRead(post)}
                    />
                )}
                {post.post_title}
                <StyledTitlePreview>
                    {/* <StyledProfilePictureArea> */}
                        <DivTag>
                            {post.postUserPhoto ? (
                                <ImgvTag
                                    src={`${url}/img/${post.postUserPhoto}`}
                                />
                            ) : (
                                <ImgvTag
                                    src={`http://placeimg.com/640/${getRandomIntInclusive(
                                        480,
                                        640
                                    )}/people`}
                                />
                            )}
                        </DivTag>
                    {/* </StyledProfilePictureArea> */}
                    <div className="text">
                        <p className="title">{`${
                            post.user_id
                        } : ${post.post_content.substring(0, 6)}...`}</p>
                    </div>
                </StyledTitlePreview>
            </StyledSinglePost>
        // </div>
    )
}
