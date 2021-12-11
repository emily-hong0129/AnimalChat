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
    background-color: #ffefd5;
`

const Header = styled.h1`
    font-size: 7rem;
    margin: 2.5rem;
    text-align: center;
    color: palevioletred;
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
    background-color: #feefd5;
    min-width: 400px;
    width: 40vw;
    height: 70vw;

    & h1 {
        font-size: 3rem;
        font-weight: bold;
        color: palevioletred;
    }
    & button.close {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
        padding: 0.5rem 2rem;
        font-size: 1rem;
        text-decoration: underline;
        color: #7b7b7b;
        border: none;
        background-color: transparent;
    }
`

// input과 input 제목, 비밀번호 경고
export const SignInModalForm = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    font-size: 1.33rem;
    color: palevioletred;
`

// input과 input 제목, 비밀번호 경고
const InputSet = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h4 {
        color: #424242;
    }
    & input {
        width: 40%;
        padding: 0.33rem;
        margin: 0.5rem;
    }
    & .errorMessage {
        font-size: 1rem;
        font-weight: normal;
        color: #e00000;
    }
`

// 로그인 버튼 2개
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
        font-size: 1rem;
        border: none;
        color: white;
    }
    & button.justLogin {
        // 자체로그인색상
        background-color: #419300;
    }
    & button.socialLogin {
        // 소셜로그인색상
        background-color: #ea4335;
    }
`
const IconPhoto = styled.img`
    width: 100px;
`
const IconPhoto2 = styled.img`
    width: 50px;
`

axios.defaults.withCredentials = true
const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

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

    return (
        <Container>
            <Header>
                Animal Chat
                <IconPhoto src="img/image3.png" />
            </Header>

            <div>
                <SigninBtn onClick={openSignInModalHandler}>로그인</SigninBtn>
                <SigninBtn onClick={signup}>회원가입</SigninBtn>
            </div>

            {isOpen === false ? null : (
                <div>
                    <SignInModalContainer>
                        <SignInModalBackdrop>
                            <SignInModalView>
                                <h1>
                                    Animal Chat
                                    <IconPhoto2 src="img/image3.png" />
                                </h1>

                                <SignInModalForm>
                                    <InputSet className="inputSection">
                                        <h4>아이디</h4>
                                        <input
                                            type="id"
                                            onChange={handleInputValue("id")}
                                        />
                                    </InputSet>
                                    <InputSet className="inputSection">
                                        <h4>패스워드</h4>
                                        <form>
                                            <input
                                                autoComplete="off"
                                                type="password"
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
                                        로그인
                                    </button>
                                    <button className="socialLogin">
                                        구글 소셜 로그인
                                    </button>
                                </LoginButtons>

                                <button
                                    className="close"
                                    onClick={() => {
                                        setIsOpen(false)
                                    }}
                                >
                                    닫기
                                </button>
                            </SignInModalView>
                        </SignInModalBackdrop>
                    </SignInModalContainer>
                </div>
            )}
        </Container>
    )
}

export default FirstPage
