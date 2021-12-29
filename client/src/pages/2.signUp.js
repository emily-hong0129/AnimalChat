/* eslint-disable */
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

axios.defaults.withCredentials = true

const url =
    process.env.REACT_APP_API_URL ||
    "http://ec2-3-35-9-246.ap-northeast-2.compute.amazonaws.com"

const Outer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #fff9ee;
`

const FormSpace = styled.div`
    min-width: 300px;
    width: 50vw;
    background-color: #FFFFFF;
    border-radius: 20px;
`

const PageTitle = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`

const InputsSection = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem auto;

    & h3 {
        margin-bottom: 0.5rem;
    }
`

const SingleInputSection = styled.div`
    margin: 0.3rem auto;
    & p {
        font-weight: bold;
    }
    & input {
        margin: 0.25rem auto;
        padding: 0.25rem;
        width: 10rem;
    }
    & select {
        margin: 0.25rem auto;
        padding: 0.25rem;
        width: 10rem;
    }
    & div.validityWarning {
        color: red;
        font-size: 0.8rem;
    }
`

const ButtonsArea = styled.div`
    margin: 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;

    & button {
        padding: 0.5rem;
        border-radius: 10px;
        border: none;
        background-color: #e00000;
        color: white;
        font-size: 1.1rem;
        font-weight: bold;
    }

    .buttons {
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        width: 40%;
        @media screen and (max-width: 450px) {
            width: auto;
        }
    }

    #submitBtn {
        background-color: #588156;
        border: 1px solid #588156;
        color: #FFFFFF;
        margin-right: 1rem;
        width: 50%;
        @media screen and (max-width: 450px) {
            width: auto;
        }
    }
    #cancleBtn {
        background-color: #FFFFFF;
        border: 1px solid #588156;
        color: #588156;
    }
`

export default function Signup(props) {
    const history = useHistory()
    const [userInfo, setUserInfo] = useState({
        userId: "",
        password: "",
        nickName: "",
        animalName: "",
        selectType: "",
        animalYob: "",
    })

    const { userId, password, nickName } = userInfo

    const handleInputValue = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    // 반려동물 type 선택
    const selectList = [
        "선택하세요",
        "햄스터",
        "병아리",
        "앵무새",
        "토끼",
        "고슴도치",
    ]
    const [Selected, setSelected] = useState("선택하세요")

    const handleSelect = (e) => {
        setSelected(e.target.value)
        setUserInfo({
            ...userInfo,
            selectType: e.target.value,
        })
    }

    // 반려동물 출생년도
    const [startDate, serStartDate] = useState(new Date())

    function dateFormat(date) {
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month >= 10 ? month : "0" + month
        day = day >= 10 ? day : "0" + day

        return date.getFullYear() + "." + month + "." + day
    }

    // userId 유효성검사
    const [userCheck, setUserCheck] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState(false)
    const [nickNameCheck, setNickNameCheck] = useState(false)

    // 유효성 검사 (아이디, 비밀번호, 닉네임) , 중복 사용이 있는지 확인 필요
    let regUserId = /^[a-zA-z0-9]{6,12}$/ // 아이디
    let regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,15}$/ // 비밀번호
    let regNickName = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,15}$/ // 닉네임, 2 ~ 15자 한글, 영문, 숫자

    // 아이디
    useEffect(() => {
        if (userId) {
            const checkId = regUserId.test(userId)

            if (checkId) {
                setUserCheck(true)
            } else {
                setUserCheck(false)
            }
        }
    }, [userId])

    // 비밀번호
    useEffect(() => {
        if (password) {
            const checkPassword = regPassword.test(password)

            if (checkPassword) {
                setPasswordCheck(true)
            } else {
                setPasswordCheck(false)
                // 유효하지않다는 메세지 띄우기
            }
        }
    }, [password])

    // 닉네임
    useEffect(() => {
        if (nickName) {
            const checkNickName = regNickName.test(nickName)

            if (checkNickName) {
                setNickNameCheck(true)
            } else {
                setNickNameCheck(false)
                // 유효하지않다는 메세지 띄우기
            }
        }
    }, [nickName])

    // * 추가필요 입력한 아이디, 닉네임이 중복되지 않아야함 : 입력후 회원가입버튼 눌렀을시 서버에 데이터가 보내지면서 기존 유저정보에서 중복검사

    // 회원가입 버튼
    const handleSubmit = () => {
        if (
            userCheck &&
            passwordCheck &&
            nickNameCheck &&
            Selected !== "선택하세요" &&
            userInfo.animalName.length !== 0
        ) {
            axios({
                url: url + "/signup",
                method: "post",
                data: userInfo,
                "Content-Type": "application/json",
                withCredentials: true,
            }).then((res) => {
                if (res.status === 201) {
                    alert("회원가입 완료")
                    props.SignUpFin()
                } else if (res.status === 202) {
                    alert("아이디 중복입니다.")
                } else if (res.status === 203) {
                    alert("닉네임 중복입니다.")
                }
            })
        } else {
            // 입력하지 않았을때
            alert("모든 항목은 필수입니다.")
        }
    }

    return (
        <Outer>
            <FormSpace>
                <PageTitle>회원가입</PageTitle>
                <StyledForm onSubmit={(e) => e.preventDefault()}>
                    <InputsSection className="humanInputs">
                        <h3>회원 정보</h3>

                        <SingleInputSection>
                            <p>아이디</p>
                            <input
                                type="userId"
                                name="userId"
                                placeholder="6 ~ 12자, 영문 또는 숫자"
                                onChange={handleInputValue}
                            />
                            {userCheck ? null : (
                                <div className="validityWarning">
                                    아이디 형식이 올바르지 않습니다.
                                </div>
                            )}
                        </SingleInputSection>

                        <SingleInputSection>
                            <p>비밀번호</p>
                            <input
                                autoComplete="off"
                                type="password"
                                name="password"
                                placeholder="4 ~ 15자, 영문과 숫자 포함"
                                onChange={handleInputValue}
                            />
                            {passwordCheck ? null : (
                                <div className="validityWarning">
                                    비밀번호 형식이 올바르지 않습니다.
                                </div>
                            )}
                        </SingleInputSection>

                        <SingleInputSection>
                            <p>닉네임(2글자 이상)</p>
                            <input
                                placeholder="2 ~ 15자, 한글, 영문, 숫자"
                                type="nickName"
                                name="nickName"
                                onChange={handleInputValue}
                            />
                            {nickNameCheck ? null : (
                                <div className="validityWarning">
                                    닉네임 형식이 올바르지 않습니다.
                                </div>
                            )}
                        </SingleInputSection>
                    </InputsSection>

                    <InputsSection className="animalInputs">
                        <h3>반려동물 정보</h3>
                        <SingleInputSection>
                            <p>반려동물의 종류</p>
                            <select onChange={handleSelect} value={Selected}>
                                {selectList.map((item) => (
                                    <option value={item} key={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {Selected !== "선택하세요" ? null : (
                                <div className="validityWarning">
                                    종류를 선택하세요.
                                </div>
                            )}
                        </SingleInputSection>

                        <SingleInputSection>
                            <p>반려동물의 이름</p>
                            <input
                                type="animalName"
                                name="animalName"
                                onChange={handleInputValue}
                            />
                        </SingleInputSection>

                        <SingleInputSection>
                            <p>반려동물의 생년월일</p>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    serStartDate(date)
                                    setUserInfo({
                                        ...userInfo,
                                        animalYob: dateFormat(date),
                                    })
                                }}
                            />
                        </SingleInputSection>
                    </InputsSection>

                    <ButtonsArea>
                        <div className="buttons">
                            <button id="submitBtn" type="submit" onClick={handleSubmit}>
                                회원가입
                            </button>
                            <button id="cancleBtn" onClick={() => history.goBack()}>취소</button>
                        </div>
                    </ButtonsArea>
                </StyledForm>
            </FormSpace>
        </Outer>
    )
}
