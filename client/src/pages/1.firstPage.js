/* eslint-disable */
import { useHistory } from "react-router-dom"
import React, { useState } from "react"
import styled from "styled-components"
import axios from "axios"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #fff9ee;
`

const Header = styled.div`
    text-align: center;
    margin-bottom: 1rem;
    span {
        font-weight: bold;
        font-size: 7rem;
        margin-right: 1rem;
        text-align: center;
        color: palevioletred;
        @media screen and (max-width: 1080px) {
            width: 45%;
            height: 50%;
        }
        @media screen and (max-width: 750px) {
            font-size: 100px;
        }
        @media screen and (max-width: 660px) {
            font-size: 80px;
        }
        @media screen and (max-width: 550px) {
            font-size: 70px;
        }
        @media screen and (max-width: 480px) {
            font-size: 55px;
        }
    }
`

const SigninBtn = styled.h1`
    margin: 1rem;
    font-size: 2rem;
    text-align: center;
    color: palevioletred;

    &:hover {
        color: #892847;
    }
`

export const SignInModalContainer = styled.div`
    text-align: center;
`

// 모달 배경
export const SignInModalBackdrop = styled.div`
    position: fixed;
    display: grid;
    place-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`

export const SingInModalBtn = styled.button`
    background-color: #4000c7;
    text-decoration: none;
    border: none;
    padding: 20px;
    color: white;
    border-radius: 30px;
    cursor: grab;
`

// 모달 창
export const SignInModalView = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;
    background-color: #ffffff;
    width: 450px;
    height: 550px;
    @media screen and (max-width: 1080px) {
        width: 45%;
        height: 50%;
    }
    @media screen and (max-width: 750px) {
        width: 50%;
        height: 45%;
    }
    @media screen and (max-width: 660px) {
        width: 60%;
        height: 40%;
    }
    @media screen and (max-width: 550px) {
        width: 90%;
        height: 55%;
    }

    & p {
        font-size: 3rem;
        font-weight: bold;
        color: palevioletred;
        margin: 10px 0 20px 0;
    }
`

// input과 input 제목, 비밀번호 경고
export const SignInModalForm = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    /* font-size: 1.33rem; */
    color: palevioletred;
    & p {
        font-weight: bold;
        color: black;
        font-size: 1rem;
    }
    #inputId {
        margin-bottom: 10px;
    }
`

// input과 input 제목, 비밀번호 경고
const InputSet = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & p {
        color: #424242;
        margin: 0;
    }
    & input {
        width: 150px;
        padding: 0.33rem;
        margin: 0.5rem;
    }
    & .errorMessage {
        font-size: 1rem;
        font-weight: normal;
        color: #e00000;
    }
`

// login button
const LoginButtons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;

    & button {
        margin: 0.5rem;
        padding: 0.5rem;
        width: 30%;
        height: 18px;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        color: white;
        border-radius: 10px;
    }
    & button.justLogin {
        background-color: #588156;
        border: 2px solid #588156;
    }
    & button.close {
        background-color: #ffffff;
        border: 1px solid #588156;
        color: #588156;
    }
    & button.NonMembers {
        background-color: #588156;
        border: 2px solid #588156;
    }
`
const IconPhoto = styled.img`
    width: 10%;
    @media screen and (max-width: 1080px) {
        width: 120px;
        height: 120px;
    }
    @media screen and (max-width: 750px) {
        width: 100px;
        height: 100px;
    }
    @media screen and (max-width: 660px) {
        width: 80px;
        height: 80px;
    }
    @media screen and (max-width: 550px) {
        width: 70px;
        height: 70px;
    }
    @media screen and (max-width: 480px) {
        width: 55px;
        height: 55px;
    }
`
const IconPhoto2 = styled.img`
    width: 50px;
    margin-left: 5px;
`

axios.defaults.withCredentials = true
const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-202-229.ap-northeast-2.compute.amazonaws.com"

export const FirstPage = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loginInfo, setLoginInfo] = useState({ id: "", password: "" })
    const [errMessage, setErrMessage] = useState(false)
    const history = useHistory()

    function signup() {
        history.push("/signup")
    }

    function openSignInModalHandler() {
        setIsOpen(!isOpen)
    }

    const handleInputValue = (key) => (e) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value })
    }

    function signUpHandler(e) {
        if (loginInfo === null || !loginInfo.id || !loginInfo.password) {
            setErrMessage(" 아이디와 패스워드를 입력하세요.")
        } else {
            //로그인 정보를 모두 입력했을 때
            axios({
                url: url + "/signin",
                method: "post",
                data: { id: loginInfo.id, password: loginInfo.password },
                "Content-Type": "application/json",
                withCredentials: true,
            })
                .then((res) => {
                    localStorage.setItem(
                        "accessToken",
                        JSON.stringify(res.data.accessToken)
                    )

                    props.loginFunc()

                    alert("로그인 완료")
                    history.push("/")
                })
                .catch((err) => {
                    setErrMessage("아이디 또는 비밀번호를 확인하세요")
                })
        }
    }
    const [userInfo, setUserInfo] = useState({
        userId: "testman",
        password: "123q",
        nickName: "테스터맨",
        animalName: "테스터",
        selectType: "햄스터",
        animalYob: "2021.11.30",
    })
    function testLogin(e) {
        //테스터 아이디 만들고
        axios({
            url: url + "/signup",
            method: "post",
            data: userInfo,
            "Content-Type": "application/json",
            withCredentials: true,
        }).then((res) => {
            axios({
                url: url + "/signin",
                method: "post",
                data: { id: "testman", password: "123q" },
                "Content-Type": "application/json",
                withCredentials: true,
            })
                .then((res) => {
                    localStorage.setItem(
                        "accessToken",
                        JSON.stringify(res.data.accessToken)
                    )

                    props.loginFunc()

                    alert("로그인 완료")
                    history.push("/")
                })
                .catch((err) => {
                    setErrMessage("아이디 또는 비밀번호를 확인하세요")
                })
        })
    }

    return (
        <Container>
            <Header>
                <span id="title">Animal Chat</span>
                <IconPhoto src="img/image3.png" />
            </Header>

            <div>
                <SigninBtn onClick={openSignInModalHandler}>Login</SigninBtn>
                <SigninBtn onClick={signup}>Signup</SigninBtn>
            </div>

            {isOpen === false ? null : (
                <div>
                    <SignInModalContainer>
                        <SignInModalBackdrop>
                            <SignInModalView>
                                <p>
                                    Animal Chat
                                    <IconPhoto2 src="img/image3.png" />
                                </p>

                                <SignInModalForm>
                                    <InputSet
                                        className="inputSection"
                                        id="inputId"
                                    >
                                        {/* <p>ID</p> */}
                                        <input
                                            type="id"
                                            placeholder="ID"
                                            onChange={handleInputValue("id")}
                                        />
                                    </InputSet>
                                    <InputSet className="inputSection">
                                        {/* <p>PASSWORD</p> */}
                                        <form>
                                            <input
                                                autoComplete="off"
                                                type="password"
                                                placeholder="PASSWORD"
                                                onChange={handleInputValue(
                                                    "password"
                                                )}
                                            />
                                        </form>
                                        <div className="errorMessage">
                                            {errMessage}
                                        </div>
                                    </InputSet>
                                </SignInModalForm>

                                <LoginButtons className="loginModalButtons">
                                    <button
                                        onClick={(e) => signUpHandler(e)}
                                        className="justLogin"
                                    >
                                        Login
                                    </button>
                                    {/* <button className="socialLogin">
                                        구글 소셜 로그인
                                    </button> */}
                                    <button
                                        className="close"
                                        onClick={() => {
                                            setIsOpen(false)
                                        }}
                                    >
                                        닫기
                                    </button>
                                    <button
                                        onClick={(e) => testLogin()}
                                        className="NonMembers"
                                    >
                                        비회원 로그인
                                    </button>
                                </LoginButtons>
                            </SignInModalView>
                        </SignInModalBackdrop>
                    </SignInModalContainer>
                </div>
            )}
        </Container>
    )
}

export default FirstPage
