import axios from "axios"
import { useState } from "react"
import styled from "styled-components"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

axios.defaults.withCredentials = true

const url =
  process.env.REACT_APP_URL ||
  "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"

const Outer = styled.div`
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  width: 350px;
  /* padding: 1rem; */
  /* border: 1px solid blue; */
  margin: 0 auto;
`

const PictureAndText = styled.div`
  display: flex;
  /* border: 1px solid orange; */
`
// 사진 div
const PictureSpace = styled.form`
  display: block;
  flex: 1.5;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
`
// 사진
// TODO axios 요청 이후 - img태그로 바꾸고 배경색, border 빼기
const RoundPicture = styled.img`
  margin: 1rem auto;
  box-sizing: content-box;
  display: block;
  border-radius: 50%;
  width: 120px;
  height: 120px;
`
// 사진없을때
const NonePicture = styled.div`
  margin: 1rem auto;
  box-sizing: content-box;
  border-radius: 50%;
  background-color: grey;
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 120px;
  p{
    vertical-align: middle;
  }
`

const TextSpace = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

  & > h4 {
    margin: 0;
    padding: 0;
  }

  & > p {
    margin: 0;
    padding: 0;
  }
`

const ButtonSpace = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Button = styled.button`
  margin: 1rem;
`

const PhotoSelectBtn = styled.input`
  /* border: 1px solid red; */
  width: 100%;
`

const PhotoUpLoadBtn = styled.button`
  border: 1px solid gray;
  width: 72px;
  height: 20px;
  margin-top: 5px;
`

export default function AddAnimalInfo({infoAnimal , addButtonHandler, cancleButton}) {
  // console.log('animalInfo : ', infoAnimal.user_id);
  // console.log('AddAnimalInfo', props.props.userinfo);
  const [animalInfo, setAnimalInfo] = useState({
    userId: infoAnimal.user_id,
    animalName: "",
    animalYob: "",
  })

  const {
    animalName,
    animalYob,
  } = animalInfo

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
    setAnimalInfo({
      ...animalInfo,
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

  // 입력창
  const handleInputValue = (e) => {
    setAnimalInfo({ ...animalInfo, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  // 사진업로드
  const [photo, setPhoto] = useState("")
  const [uploadedImg, setUploadedImg] = useState({
    fileName: null,
    filePath: null,
  })

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("img", photo)
    
    // console.log("photo : ", photo); // 잘나옴
    console.log("formData : ", formData)  // formData {}
    
    axios.post(url + "/animalphoto", formData,{
      "Content-Type": "multipart/form-data",
      withCredentials: true,
    })
    .then((res) => {
      const { fileName } = res.data
      setUploadedImg({ fileName, filePath: `${url}/img/${fileName}` })
      alert("사진을 성공적으로 업로드 하였습니다.")
    })
    .catch((err) => {
      console.error(err)
    })
  }

  const addFile = (e) => {
    console.log(e.target.files[0])
    setPhoto(e.target.files[0])
  }

  // 추가버튼
  const addButton = () => {
    if(Selected && animalName && animalYob){
      console.log('추가!')

      axios({
        url : url + "/edituserinfo",
        method: "post",
        data: {
          animalInfo: animalInfo,
          animal_photo: "/img/" + uploadedImg.fileName,
        }
      })
      .then((res) => {
        alert("추가 완료")
        addButtonHandler();
      })
    }else{
      alert("모두 입력해주세요.")
    }
  }
  
  const closeModal = () => {
    cancleButton()
  }

  return (
    <div className="singleAnimalInfo">
      <Outer>
        <PictureAndText>
          
          <PictureSpace onSubmit={onSubmit}>
            {uploadedImg.filePath === null? (
              <NonePicture><p>사진이 없습니다</p></NonePicture>
            ) : (
              <RoundPicture
                src={uploadedImg.filePath}
              />
            )}
            <PhotoSelectBtn type="file" onChange={addFile}/>
            <PhotoUpLoadBtn type="submit">사진 업로드</PhotoUpLoadBtn>
          </PictureSpace>

          <TextSpace>
            {/* TODO : 이름과 출생년도 props, 악시오스 요청 */}
            <div>
              <h4>반려동물 종류</h4>
              {/* <input type="text" name="type" placeholder="종류" onChange={handleInputValue}/> */}
              <select onChange={handleSelect} value={Selected}>
                {selectList.map((item) => (
                  <option value={item} key={item}>
                    {item}
                    {
                      // console.log(Selected)
                    }
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h4>반려동물 이름</h4>
              <input type="text" name="animalName" placeholder="햄찌" onChange={handleInputValue}/>
            </div>
            <div>
              <h4>출생년도</h4>
              <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    console.log(dateFormat(date))
                    serStartDate(date)
                    setAnimalInfo({
                      ...animalInfo,
                      animalYob: dateFormat(date),
                    })
                  }}
                />
            </div>
          </TextSpace>
        </PictureAndText>
        <ButtonSpace>
          {/* TODO : 수정 페이지 Link, 라우팅 */}
          <Button onClick={addButton}>추가</Button>
          <Button onClick={closeModal}>취소</Button>
        </ButtonSpace>
      </Outer>
    </div>
  )
}

