import styled from "styled-components"
import { Link } from "react-router-dom"
import SinglePostOnBoard from "../components/SinglePostOnBoard"

const Outer = styled.div`
    min-height: 500px;
    height: 100%;
    background-color: #fff9ee;
`

const Background = styled.div`
    box-sizing: content-box;
    padding: 2rem 1rem 4rem 1rem;
    background-color: #fff9ee;
    @media screen and (min-width: 1500px) {
        margin: 0 auto;
        width: 80%;
    }
    @media screen and (max-width: 577px) {
        padding: 0;
    }
`

const WriteButton = styled.button`
    border: none;
    margin: 1rem auto;
    padding: 0.5rem;
    background-color: #a06a50;

    font-weight: bold;
    font-size: 1.05rem;
    border-radius: 8px;

    &:hover {
        color: white;
        background-color: #55433b;
    }
    @media screen and (max-width: 577px) {
        font-size: 0.8rem;
        margin-left: 0.5rem;
    }
`

const BoardInGrid = styled.div`
    box-sizing: content-box;
    display: grid;
    padding: 1rem;
    gap: 3rem;
    grid-template-columns: repeat(auto-fit, 250px);
    justify-content: center;
    align-content: center;

    @media screen and (max-width: 938px) {
        gap: 2rem;
    }
    @media screen and (max-width: 640px) {
        padding: 1rem 0;
        gap: 1rem;
    }
    @media screen and (max-width: 577px) {
        grid-template-columns: 1fr;
        padding: 0 0 1rem 0;
    }
    @media screen and (max-width: 375px) {
        grid-gap: 2rem;
    }
`

const ImgTag = styled.img`
    max-width: 40%;
`
const DivTag = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 2rem;
`
const DivTag2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family: "IBM Plex Sans KR", sans-serif;
    font-size: 1.2rem;
    p {
        margin-top: 1rem;
    }
`

export default function Posts({
    title,
    isLinkToWritePage,
    postList,
    curAnimal,
    curPostRead,
}) {
    return (
        <Outer className="boards">
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

                {postList.length === 0 ? (
                    <DivTag className={"divTag"}>
                        <DivTag2>
                            <ImgTag src={"../img/pen.png"} />
                        </DivTag2>
                        <DivTag2>
                            <p>첫 번째 글을 작성해보는 것은 어떨까요?</p>
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
        </Outer>
    )
}
