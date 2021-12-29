import React from "react"

import styled from "styled-components"

const Outer = styled.div`
    margin: 0 auto;
    font-family: "IBM Plex Sans KR", sans-serif;
    background-color: #ffffff;
    height: 150px;
    background-color: white;

    //모바일
    @media screen and (max-width: 1080px) {
        width: 100%;
    }
    @media screen and (max-width: 511px) {
        width: 100%;
    }
`

const GifTag = styled.img`
    @media screen and (max-width: 1080px) {
        display: none;
    }
`
const ImgTag = styled.img`
    width: 63px;
    margin-bottom: 5px;
    margin-left: -21px;
    @media screen and (max-width: 1080px) {
        display: none;
    }
`
const IconTag = styled.img`
    width: 20px;
    margin-bottom: -2px;
`
const FlexRow1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0 auto;
    padding-top: 50px; // 수직 가운데추가
`
const FlexRow2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 7px;

    & button {
        font-weight: bold;
        background-color: transparent;
        color: #a06a50;

        &:hover {
            background-color: #fedcaa;
        }
    }
`
const DivTag1 = styled.div`
    color: #a06a50;
    font-weight: bold;
    font-size: 14px;
`
const FlexColumn1 = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1080px) {
        margin-top: 1.5rem;
        // display: none;
    }
`
const FlexColumn2 = styled.div`
    @media screen and (max-width: 1080px) {
        display: none;
    }
`
const FlexColumn3 = styled.div`

    @media screen and (max-width: 1080px) {
        display: none;
    }
`
const FlexColumn4 = styled.div`
    display: none;
    @media screen and (max-width: 1080px) {
        display: flex;
        flex-direction: column;
    }
`
const FlexCenter1 = styled.div`
    display: flex;
    justify-content: center;
`

export default function Footer(props) {
    return (
        <Outer className="footerComponent">
            <FlexRow1>
                <FlexColumn2>
                    <GifTag src={"../img/footerGif.gif"} alt={""} />

                    <ImgTag src={"../img/image3.png"} alt={""} />
                </FlexColumn2>
                <FlexColumn3>
                    <FlexRow2>
                        <button
                            onClick={() => alert("준비중 입니다.")}
                        >{`개인정보처리방침 `}</button>
                        <div>&nbsp;</div>
                        <DivTag1>{"|"}</DivTag1>
                        <div>&nbsp;</div>
                        <button onClick={() => alert("준비중 입니다.")}>
                            {" "}
                            이용약관
                        </button>
                    </FlexRow2>
                    <FlexCenter1>
                        <DivTag1>
                            Copyright © Animal Butler. All Rights Reserved.
                        </DivTag1>
                    </FlexCenter1>
                </FlexColumn3>
                <FlexColumn1>
                    <DivTag1>
                        박경훈&nbsp;
                        <IconTag src={"../img/git.png"} alt={""} />
                        <a
                            href="https://github.com/kingshuny"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Git
                        </a>{" "}
                        |&nbsp;
                        <IconTag src={"../img/blog.png"} alt={""} />
                        <a
                            href="https://smartstyle.tistory.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Blog{" "}
                        </a>
                        |&nbsp;
                        <IconTag src={"../img/email.png"} alt={""} />
                        nicecap77@gmail.com
                    </DivTag1>
                    <DivTag1>
                        오선화&nbsp;
                        <IconTag src={"../img/git.png"} alt={""} />
                        <a
                            href="https://github.com/xuanhee16"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Git
                        </a>{" "}
                        |&nbsp;
                        <IconTag src={"../img/blog.png"} alt={""} />
                        <a
                            href="https://xuanhee16.github.io"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Blog{" "}
                        </a>
                        |&nbsp;
                        <IconTag src={"../img/email.png"} alt={""} />
                        xuanhee16@gmail.com
                    </DivTag1>
                    <DivTag1>
                        홍현정&nbsp;
                        <IconTag src={"../img/git.png"} alt={""} />
                        <a
                            href="https://github.com/emily-hong"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Git
                        </a>{" "}
                        |&nbsp;
                        <IconTag
                            src={"../img/blog.png"}
                            alt={""}
                            rel="noreferrer"
                        />
                        <a
                            href="https://emilyhong4659.notion.site/emilyhong4659/Today-I-Learned-9f74900b637947199c72d1220cc3451d"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Blog{" "}
                        </a>
                        |&nbsp;
                        <IconTag src={"../img/email.png"} alt={""} />
                        emilyhong4659@gmail.com
                    </DivTag1>
                </FlexColumn1>
            </FlexRow1>
            <FlexColumn4>
                <FlexRow2>
                    <button
                        onClick={() => alert("준비중 입니다.")}
                    >{`개인정보처리방침 `}</button>
                    <div>&nbsp;</div>
                    <DivTag1>{"|"}</DivTag1>
                    <div>&nbsp;</div>
                    <button onClick={() => alert("준비중 입니다.")}>
                        {" "}
                        이용약관
                    </button>
                </FlexRow2>
                <FlexCenter1>
                    <DivTag1>
                        Copyright © Animal Butler. All Rights Reserved.
                    </DivTag1>
                </FlexCenter1>
            </FlexColumn4>
        </Outer>
    )
}
