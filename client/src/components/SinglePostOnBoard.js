import { useHistory } from "react-router-dom"
import styled from "styled-components"
import React from "react"

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-202-229.ap-northeast-2.compute.amazonaws.com"

const StyledSinglePost = styled.div`
    display: grid;
    place-items: center center;
    padding: 0.35rem;
    height: 350px;
    background-color: #bd9c8c;
    border-radius: 20px;

    &:hover {
        transform: scale(1.03);
        transition: transform 0.3s;
    }

    @media screen and (max-width: 577px) {
        display: block;
        padding: 0rem;
        margin-top: 0px;
        height: auto;
        background-color: #fff9ee;
        border-radius: 0;
    }
    @media screen and (max-width: 375px) {
    }
`
const DivTag4 = styled.div``
// 게시물사진
const ImgDiv = styled.div`
    @media screen and (max-width: 577px) {
        width: 100%;
    }
`
const StyledThumbnail = styled.img`
    width: 175px;
    height: 175px;
    background-color: #ffd000;
    border-radius: 10%;

    @media screen and (max-width: 577px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
    }
    @media screen and (max-width: 375px) {
    }
`
// 게시물 제목
const Title = styled.div`
    padding: 0 1.5rem;
    p {
        font-size: 1.8rem;
        text-align: center;
        height: 1.9rem;
        overflow: hidden;
    }
    @media screen and (max-width: 577px) {
        margin: 0.5rem 0;
    }
`
const StyledTitlePreview = styled.div`
    display: flex;
    padding: 0.25rem;
    font-size: 0.9rem;
    color: #424242;

    & p {
        padding: 0.25rem;
        font-size: 1rem;
        color: #424242;
        line-height: 2rem;
    }
    & .writer {
        font-size: 0.8rem;
    }

    @media screen and (max-width: 577px) {

        border-bottom: 5px solid #A06A50;

    }
    @media screen and (max-width: 375px) {
        .title {
            font-size: 0.2rem;
            height: 70%;
        }
    }
`

const ProfileAndText = styled.div`
    display: flex;
    @media screen and (max-width: 577px) {
        margin: 0 auto;
        margin-bottom: 1rem;
    }
`

const DivTag = styled.div`
    width: 35px;
    height: 35px;
    margin: 0 auto;
    @media screen and (max-width: 511px) {
        width: 35px;
        height: 35px;
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

    return (
        <DivTag4 className="singlePostOnBoard">
            {/* 랜덤이미지 */}
            {/* <StyledSinglePost>
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
                    <StyledProfilePictureArea>
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
                    </StyledProfilePictureArea>
                    <div className="text">
                        <p className="title">{`${
                            post.user_id
                        } : ${post.post_content.substring(0, 6)}...`}</p>
                    </div>
                </StyledTitlePreview>
            </StyledSinglePost> */}

            {/* 랜덤이미지 아닐 때 */}
            <StyledSinglePost>
                <ImgDiv>
                    <StyledThumbnail
                        src={url + post.post_img}
                        onClick={() => postRead(post)}
                    />
                </ImgDiv>

                <Title>
                    <p>{post.post_title}</p>
                </Title>

                <StyledTitlePreview>
                    <ProfileAndText>
                        <DivTag>
                            <ImgvTag src={`${url}/img/${post.postUserPhoto}`} />
                        </DivTag>
                        <div className="text">
                            <p className="title">{`${
                                post.user_id
                            } : ${post.post_content.substring(0, 6)}...`}</p>
                        </div>
                    </ProfileAndText>
                </StyledTitlePreview>
            </StyledSinglePost>
        </DivTag4>
    )
}
