import { Link } from "react-router-dom"
import styled from "styled-components"

// styled components
const Outer = styled.div`
    width: 100vw;
    background-color: white;
`

const ButtonsArea = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // border: 1px solid red;
    /* background-color: #FFD489; */
    // background-color: #fff2e2;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
    // background-color: #a06a50;

    & button {
        border: none;
        border-radius: 8px;
        margin: auto 0.5rem;
        padding: 0.5rem 1rem;
        /* background-color: #FFB83E; */
        // background-color: #95e4fe;
        // background-color: #ff9075;
        background-color: #a06a50;

        color: white;
        font-size: 1.2rem;
        // font-weight: bold;
        &:hover {
            color: white;
            // background-color: #ffc9d4;
            background-color: #55433b;
        }
    }
`

const HomeButtonArea = styled.div`
    display: flex;
    margin-right: 2rem;
    // color: black;

    & button {
        color: black;

        font-weight: bold;
        border: none;
        margin: auto 0.5rem;
        padding: 0.5rem;
        /* background-color: #FFA200; */
        // background-color: #fedcaa;
        background-color: #a06a50;
    }
`

export default function Navigation() {
    return (
        <Outer className="navigation">
            <ButtonsArea>
                <HomeButtonArea>
                    <Link to="/mainpage">
                        <button className="homeButton">전체</button>
                    </Link>
                </HomeButtonArea>
                <div className="boardButtonsSpace">
                    <Link to="/board/hamster">
                        <button className="boardButton">햄스터</button>
                    </Link>
                    <Link to="/board/chick">
                        <button className="boardButton">병아리</button>
                    </Link>
                    <Link to="/board/parrot">
                        <button className="boardButton">앵무새</button>
                    </Link>
                    <Link to="/board/rabbit">
                        <button className="boardButton">토끼</button>
                    </Link>
                    <Link to="/board/hedgehog">
                        <button className="boardButton">고슴도치</button>
                    </Link>
                </div>
            </ButtonsArea>
        </Outer>
    )
}

// TODO
// [x] react-router-dom 적용 필요
// [x] 홈버튼과 게시판 버튼 그룹 사이에 공간 필요 // margin으로? (o)
