import { Link } from "react-router-dom"
import styled from "styled-components"

// styled components
const Outer = styled.div`
    width: 100%;
    background-color: white;
`

const ButtonsArea = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;

    .homeButton {
        color: black;
        font-weight: bold;
        border: none;
    }
    & button {
        border: none;
        border-radius: 8px;
        margin: auto 0.5rem;
        padding: 0.5rem 1rem;
        background-color: #a06a50;
        
        color: white;
        font-size: 1.2rem;
        &:hover {
            color: white;
            background-color: #55433b;
        }
    }
    
    /* 반응형 */
    @media screen and (max-width: 660px) {
        padding: 0.5rem;
        margin: auto 0.2rem;
        button {
            font-size: 0.9rem;
        }
        
    }
    @media screen and (max-width: 575px) {
        padding-left: 0;
        padding-right: 0;
        button {
            padding: 0.5rem;
        }
    }
    @media screen and (max-width: 460px) {
        button {
            font-size: 0.5rem
        }
    }
    @media screen and (max-width: 366px) {
        button {
            margin-bottom: 0.3rem;
        }
    }
`

// const HomeButtonArea = styled.div`
//     display: flex;
//     margin-right: 2rem;

//     & button {
//         color: black;
//         font-weight: bold;
//         border: none;
//         margin: auto 0.5rem;
//         padding: 0.5rem;
//         background-color: #a06a50;
//     }
// `

export default function Navigation() {
    return (
        <Outer className="navigation">
            <ButtonsArea>
                {/* <HomeButtonArea></HomeButtonArea> */}
                <div className="boardButtonsSpace">
                    <Link to="/mainpage">
                        <button className="homeButton">전체</button>
                    </Link>
                    <Link to="/board/hamster">
                        <button className="boardButton">햄스터</button>
                    </Link>
                    <Link to="/board/chick">
                        <button className="boardButton">병아리 & 닭</button>
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