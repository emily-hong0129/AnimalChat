import styled from "styled-components"
import { Link } from "react-router-dom"
import SinglePostOnBoard from "../components/SinglePostOnBoard"
import axios from "axios"
const Background = styled.div`
    box-sizing: content-box;
    // background-color: white;
    padding: 1rem;
    /* border-bottom: 1px solid red; */

    @media screen and (min-width: 1500px) {
        margin: 0 auto;
        width: 80%;
    }
    background-color: #fff9ee;
`

const WriteButton = styled.button`
    border: none;
    margin: 1rem auto;
    padding: 0.5rem;
    background-color: #a06a50;

    font-weight: bold;
    font-size: 1.05rem;
    border-radius: 8px;
    // color: white;

    &:hover {
        color: white;
        // background-color: #ffc9d4;
        background-color: #55433b;
    }
`

const BoardInGrid = styled.div`
    box-sizing: content-box;
    display: grid;
    padding: 1rem;
    gap: 3rem;
    grid-template-columns: repeat(auto-fit, 200px);
    justify-content: center;
    align-content: center;

    @media screen and (max-width: 375px) {
        grid-template-columns: 1fr 1fr;
        grid-gap: 2rem;
    }
    @media screen and (max-width: 300px) {
        // 최소화면넓이
        grid-template-columns: 1fr;
        grid-gap: 1rem;
    }
`
const HiddenTag = styled.div`
    color: white;
`
const ImgTag = styled.img`
    max-width: 40%;
`
const DivTag = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const DivTag2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family: "IBM Plex Sans KR", sans-serif;
    font-size: 200%;
`
const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export default function Posts({
    title,
    isLinkToWritePage,
    postList,
    curAnimal,
    curPostRead,
}) {
    function sFunc() {
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min
        }

        for (let n = 0; n < 10; n++) {
            axios({
                url: url + "/sendpost",
                method: "post",
                data: {
                    user_id: Math.random().toString(36).substr(2, 5),
                    post_title: [
                        "우리집 햄스터입니다.",
                        "우리집 병아리입니다.",
                        "우리집 앵무새입니다.",
                        "우리집 토끼입니다.",
                        "우리집 고슴도치입니다.",
                        "햄스터 오늘의모습입니다.",
                        "병아리 오늘의모습입니다.",
                        "앵무새 오늘의모습입니다.",
                        "토끼 오늘의모습입니다.",
                        "고슴도치 오늘의모습입니다.",
                        "안녕하세요, 오늘은 우리 햄토리 입니다.",
                        "안녕하세요, 오늘은 우리 삐약이 입니다.",
                        "안녕하세요, 오늘은 우리 앵무 입니다.",
                        "안녕하세요, 오늘은 우리 토깽이 입니다.",
                        "안녕하세요, 오늘은 우리 헤지고지 입니다.",
                    ][getRandomIntInclusive(0, 14)],
                    post_content: [
                        "우리집 햄스터입니다.",
                        "우리집 병아리입니다.",
                        "우리집 앵무새입니다.",
                        "우리집 토끼입니다.",
                        "우리집 고슴도치입니다.",
                        "햄스터 오늘의모습입니다.",
                        "병아리 오늘의모습입니다.",
                        "앵무새 오늘의모습입니다.",
                        "토끼 오늘의모습입니다.",
                        "고슴도치 오늘의모습입니다.",
                        "안녕하세요, 오늘은 우리 햄토리 입니다.",
                        "안녕하세요, 오늘은 우리 삐약이 입니다.",
                        "안녕하세요, 오늘은 우리 앵무 입니다.",
                        "안녕하세요, 오늘은 우리 토깽이 입니다.",
                        "안녕하세요, 오늘은 우리 헤지고지 입니다.",
                    ][getRandomIntInclusive(0, 14)],
                    post_img: `http://placeimg.com/640/${getRandomIntInclusive(
                        480,
                        640
                    )}/animals`,
                    animalcategory: [
                        "hamster",
                        "chick",
                        "parrot",
                        "rabbit",
                        "hedgehog",
                    ][getRandomIntInclusive(0, 4)],
                },
                withCredentials: true,
            })
        }
    }

    return (
        <div className="boards">
            <Background>
                <div>
                    {isLinkToWritePage ? (
                        <Link to="/post">
                            <WriteButton>Write</WriteButton>
                        </Link>
                    ) : (
                        ""
                    )}
                </div>
                <HiddenTag onClick={() => sFunc()}>.</HiddenTag>
                {postList.length === 0 ? (
                    <DivTag className={"divTag"}>
                        <DivTag2>
                            <ImgTag src={"../img/pen.png"} />
                        </DivTag2>
                        <DivTag2>
                            <div>첫 번째 글을 작성해보는 것은 어떨까요?</div>
                        </DivTag2>
                    </DivTag>
                ) : (
                    <div></div>
                )}

                <BoardInGrid>
                    {curAnimal === "home"
                        ? postList.map((post) => (
                              <SinglePostOnBoard
                                  key={post.id}
                                  post={post}
                                  curPostRead={curPostRead}
                              />
                          ))
                        : postList
                              .filter(
                                  (post) => curAnimal === post.animalcategory
                              )
                              .map((post) => (
                                  <SinglePostOnBoard
                                      key={post.id}
                                      post={post}
                                      curPostRead={curPostRead}
                                  />
                              ))}
                </BoardInGrid>
            </Background>
        </div>
    )
}
