/* eslint-disable */
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"

const Outer = styled.div`
    height: 100vh;
    background-color: #FFF9EE;
`

const StyledPwdChangeSection = styled.div`
    display: flex;
    padding: 0;
    flex-direction: column;
    align-items: center;
    background-color: #fff9ee;
    flex: 3 1 auto;
`

const StyledPwdInputsArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 5rem;
`

const StyledPwdFieldset = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.5rem;

    & input {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
    }

    & ul {
        margin-top: 0.5rem;
    }
`

const StyledList = styled.li`
    list-style-type: none;
    flex-direction: column;
    font-size: 0.8rem;
    color: #de0f00;
    background-color: transparent;
    margin: 0;
`

const SubmitButtonArea = styled.div`
    & > button {
        padding: 0.5rem 2rem;
        margin: 2.2rem 1.5rem 2rem 2.8rem;
        margin-bottom: 10rem;
        border-radius: 3rem;
        font-size: 1rem;
    }
    .submit {
        color: #588156;
        background-color: white;
        font-weight: bold;
        &:hover {
            color: white;
            background-color: #ffbc57;
            font-weight: bold;
        }
    }
    .cancel {
        color: white;
        background-color: #588156;
        font-weight: bold;
        &:hover {
            color: #006300;
            background-color: #e55432;
            font-weight: bold;
        }
    }
`

const CheckCurPwBtn = styled.button`
    justify-content: center;
    margin-bottom: 1.3rem;
    margin-left: 1.5rem;
    border-radius: 1rem;
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0.3rem 2rem;
    background-color: #ffb5a0;
    color: white;
    &:hover {
        background-color: #ff9075;
        color: white;
    }
`

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export default function PasswordChange() {
    const history = useHistory()
    const [valid, setValid] = useState("")
    const [curPwd, setCurPwd] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [curWarning, setCurWarning] = useState("비밀번호 입력후 확인해주세요")
    const [newWarning, setNewWarning] = useState({
        input: "새로운 비밀번호를 입력하세요",
        string: "4자 이상 15글자 미만이어야 합니다",
        number: "숫자와 문자 모두 포함해야 합니다",
    })
    const { input, string, number } = newWarning

    //4글자 이상 15자 미만, 영문자, 숫자 포함
    const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,15}$/

    const curPwdHandler = (e) => {
        setCurPwd((el) => e.target.value)
        if (e.target.value.length === 0) {
            setCurWarning((el) => "비밀번호를 입력하세요")
        } else {
            setCurWarning((el) => "")
        }
    }

    const newPwdHandler = (e) => {
        setNewPwd((el) => e.target.value)

        if (e.target.value.length === 0) {
            setNewWarning((el) => {
                return { ...el, input: "비밀번호를 입력하세요" }
            })
        } else {
            setNewWarning((el) => {
                return { ...el, input: "" }
            })
        }

        if (!regPassword.test(e.target.value)) {
            setNewWarning((el) => {
                return {
                    ...el,
                    number: "영문자, 숫자가 모두 포함되어야 합니다",
                }
            })
            setValid((el) => "")
        } else {
            setNewWarning((el) => {
                return { ...el, number: "" }
            })
            setValid((el) => "사용가능한 비밀번호 입니다")
        }

        if (e.target.value.length < 4) {
            setNewWarning((el) => {
                return { ...el, string: "4글자 이상 15글자 미만이어야 합니다" }
            })
        } else {
            setNewWarning((el) => {
                return { ...el, string: "" }
            })
        }
    }

    const handleCancelButtonClick = (e) => {
        setCurPwd((el) => "")
        setNewPwd((el) => "")
        setValid((el) => "")
        history.push("/mypage")
    }

    const CheckCurPwBtnHandler = (e) => {
        const token = JSON.parse(localStorage.getItem("accessToken"))
        axios({
            url: url + "/checkpw",
            method: "post",
            data: { password: curPwd },
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${token}`,
            },
            withCredentials: true,
        }).then((res) => {
            alert(res.data)
        })
    }

    const handleButtonClick = (e) => {
        let newPwValid = regPassword.test(newPwd)

        if (newPwValid === false) {
            alert("비밀번호를 수정해주세요")
        } else {
            const token = JSON.parse(localStorage.getItem("accessToken"))

            axios({
                url: url + "/editpw",
                method: "post",
                data: { password: newPwd },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
                withCredentials: true,
            }).then((res) => {
                alert("비밀번호 변경이 완료되었습니다")
                history.push("/mainpage")
            })
        }
    }

    return (
        <Outer className="passwordChangeComponent">
            <StyledPwdChangeSection>
                <StyledPwdInputsArea>
                    <StyledPwdFieldset>
                        <h4 className="inputTitle">현재 비밀번호</h4>
                        <input
                            type="password"
                            name="curPwd"
                            placeholder="현재 비밀번호를 입력하세요"
                            value={curPwd}
                            onChange={curPwdHandler}
                        />
                        <StyledList>{curWarning}</StyledList>
                    </StyledPwdFieldset>
                    <CheckCurPwBtn onClick={CheckCurPwBtnHandler}>
                        비밀번호 확인
                    </CheckCurPwBtn>

                    <StyledPwdFieldset>
                        <h4 className="inputTitle">새 비밀번호</h4>
                        <input
                            type="password"
                            name="newPwd"
                            placeholder="4 ~ 15자, 영문과 숫자 포함"
                            value={newPwd}
                            onChange={newPwdHandler}
                        />
                        <StyledList>{input}</StyledList>
                        <StyledList>{string}</StyledList>
                        <StyledList>{number}</StyledList>
                    </StyledPwdFieldset>
                </StyledPwdInputsArea>
                <SubmitButtonArea className="submitButtonArea">
                    <button className="submit" onClick={handleButtonClick}>
                        확인
                    </button>
                    <button
                        className="cancel"
                        onClick={handleCancelButtonClick}
                    >
                        취소
                    </button>
                </SubmitButtonArea>
            </StyledPwdChangeSection>
        </Outer>
    )
}
