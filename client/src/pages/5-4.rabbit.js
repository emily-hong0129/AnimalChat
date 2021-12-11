/* eslint-disable */
import Posts from "../components/Posts"
import Header from "../components/Header"
import Navigation from "../components/Navigation"
import React, { useEffect } from "react"
import axios from "axios"
const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-102-202.ap-northeast-2.compute.amazonaws.com"
export default function Rabbit(props) {
    useEffect(() => {
        props.curAnimalChange("rabbit")
        axios({
            url: url + "/postlist",
            method: "get",
            withCredentials: true,
        }).then((res) => {
            props.getPostList(res.data)
        })
    }, [])
    return (
        <div className="mainPage">
            <Header
                setIsLogin={props.setIsLogin}
                setUserinfo={props.setUserinfo}
            />
            <Navigation isLinkToWritePage />
            <Posts
                title="토끼"
                isLinkToWritePage
                postList={props.postList}
                curAnimal={props.curAnimal}
                curPostRead={props.curPostRead}
            />
        </div>
    )
}
