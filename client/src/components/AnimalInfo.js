import axios from "axios"
import { useEffect } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"

const Outer = styled.div`
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 1rem;
    background-color: #FFFFFF;
    border-radius: 10%;
`

const PictureAndText = styled.div`
    display: flex;
`

const PictureSpace = styled.div`
    display: flex;
    flex: 1.5;
    justify-content: center;
    align-items: center;
`

const RoundPicture = styled.img`
    box-sizing: content-box;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin: 1rem;
`
// 반려동물 사진이 없을때
const NonePicture = styled.div`
    box-sizing: content-box;
    border-radius: 50%;
    background-color: grey;
    width: 120px;
    height: 120px;
    margin: 1rem;
    line-height: 120px;
    text-align: center;
    p {
        vertical-align: middle;
    }
`

const TextSpace = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;

    h4 {
        margin: 0;
        padding-top: 5px;
        font-weight: bold;
    }

    p {
        margin: 0;
        padding: 0;
    }
`

const ButtonSpace = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & > button {
        background-color: #FC8E57;
        border-radius: 10px;
        width: 25px;
        height: 25px;
        margin: 5px 0;
        font-weight: bold;
        color: #FFFFFF;
    }
`

const Button = styled.button`
    margin: 1rem;
`
const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

export default function AnimalInfo(props) {
    const history = useHistory()
    // console.log("AnimalInfo.js : ", props)

    const deleteButtonHandler = () => {
        // console.log("동물정보 삭제 버튼 동작 확인")
        axios({
            url: url + `/deleteanimal`,
            method: "delete",
            data: {
                userId: props.animalcard.userId,
                id: props.animalcard.id,
            },
            withCredentials: true,
        }).then((res) => {
            console.log(res)
            history.push("/")
            history.push("/mypage")
            // setUserAnimalInfo(res.data)
        })
    }

    return (
        <div className="singleAnimalInfo">
            <Outer>
                <PictureAndText>
                    <PictureSpace>
                        {props.animalcard.animal_photo === null ? (
                            <NonePicture>
                                <p>사진이 없습니다.</p>
                            </NonePicture>
                        ) : (
                            <RoundPicture
                                src={url + props.animalcard.animal_photo}
                                alt="반려동물사진"
                            />
                        )}
                    </PictureSpace>
                    <TextSpace>
                        {/* TODO : 이름과 출생년도 props, 악시오스 요청 */}
                        <div>
                            <h4>반려동물 종류</h4>
                            <p>{props.animalcard.animaltype}</p>
                        </div>
                        <div>
                            <h4>반려동물 이름</h4>
                            <p>{props.animalcard.animalname}</p>
                        </div>
                        <div>
                            <h4>출생년도</h4>
                            <p>{props.animalcard.animalyob}</p>
                        </div>
                    </TextSpace>
                </PictureAndText>
                <ButtonSpace>
                    {/* TODO : 수정 페이지 Link, 라우팅 */}
                    <Button onClick={deleteButtonHandler}>X</Button>
                </ButtonSpace>
            </Outer>
        </div>
    )
}
