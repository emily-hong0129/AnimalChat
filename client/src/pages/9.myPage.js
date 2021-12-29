import Header from "../components/Header"
import Navigation from "../components/Navigation"
import MyPageSection from "./9.myPageSection"
import React from "react"
import axios from "axios"
import Footer from "../components/Footer"

const url =
    process.env.REACT_APP_API_URL ||
    "http://ec2-3-35-9-246.ap-northeast-2.compute.amazonaws.com"

export default function MyPage({
    userinfo,
    setUserinfo,
    setIsLogin,
    newUserInfo,
}) {
    axios({
        url: url + `/userinfo?serchAnimalInfo=${userinfo.user_id}`,
        method: "get",
        withCredentials: true,
    }).then((res) => {})
    return (
        <div className="MyPage">
            <Header setUserinfo={setUserinfo} setIsLogin={setIsLogin} />
            <Navigation />
            <MyPageSection userinfo={userinfo} newUserInfo={newUserInfo} />
            <Footer></Footer>
        </div>
    )
}
