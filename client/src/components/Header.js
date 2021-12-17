import React from "react"
import axios from "axios"
import { Link } from "react-router-dom" // useHistory
import styled from "styled-components"

const Outer = styled.div`
    width: 100%;
    background-color: white;
`

const HeaderFlexDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const TopButtonsArea = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;

    & button {
        font-size: 1.05rem;
        font-weight: bold;
        border: none;
        margin: auto 0.5rem;
        padding: 0.5rem;
        border-radius: 2em;
        background-color: transparent;
        color: #a06a50;

        &:hover {
            background-color: #fedcaa;
        }
    }

    @media screen and (max-width: 575px) {
        padding: 0.5rem;
    }
`

const TitleArea = styled.div`
    display: flex;
    padding: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & button {
        font-size: 1.2rem;
        background-color: transparent;
        border: none;
    }
    & h2 {
        margin-top: 0.5rem;
        font-size: 1.1rem;
    }
    @media screen and (max-width: 575px) {
        padding: 1.5rem;
    }
    @media screen and (max-width: 460px) {
        h1 {
            font-size: 2rem;
        }
        h2 {
            font-size: 0.8rem;
        }
    }
`
const IconPhoto = styled.img`
    width: 40px;
`

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export default function Header(props) {

    function logoutEventListener() {
        axios({
            url: url + "/signout",
            method: "post",
            withCredentials: true,
        }).then((res) => {
            localStorage.removeItem("accessToken")
            props.setUserinfo(null)
            props.setIsLogin(false)
        })
    }

    return (
        <Outer className="headerComponent">
            <HeaderFlexDiv>
                <TopButtonsArea className="topButtonsArea">
                    <Link to="/mypage">
                        <button className="headerTopButtons">My</button>
                    </Link>
                    <Link to="/firstpage">
                        <button
                            className="headerTopButtons"
                            onClick={logoutEventListener}
                        >
                            Logout
                        </button>
                    </Link>
                </TopButtonsArea>
                <TitleArea>
                    <Link to="/board">
                        <button>
                            <h1 className="headerTitle">
                                Animal Chat{" "}
                                <IconPhoto src="../img/image3.png" alt="" />
                            </h1>
                        </button>
                    </Link>
                    <h2 className="headerDesc">반려동물 집사 커뮤니티</h2>
                </TitleArea>
            </HeaderFlexDiv>
        </Outer>
    )
}
