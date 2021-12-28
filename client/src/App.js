/* eslint-disable */
import React, { useState, useEffect } from "react"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"
import axios from "axios"
import FirstPage from "./pages/1.firstPage"
import Signup from "./pages/2.signUp"
import MainPage from "./pages/4.mainPage"
import Hamster from "./pages/5-1.hamster"
import Chick from "./pages/5-2.chick"
import Parrot from "./pages/5-3.parrot"
import Rabbit from "./pages/5-4.rabbit"
import Hedgehog from "./pages/5-5.hedgehog"
import Post from "./pages/6.post"
import PostEdit from "./pages/7.postEdit"
import PostRead from "./pages/8.postRead"
import MyPage from "./pages/9.myPage"
import GlobalStyle from "./components/GlobalStyle"
import PwdEditPage from "./pages/11-1.pwdEdit"

import "./App.css"

const url =
    process.env.REACT_APP_URL ||
    "http://ec2-54-180-202-229.ap-northeast-2.compute.amazonaws.com"

function App() {
    const [isLogin, setIsLogin] = useState(false)
    const [curAnimal, setCurAnimal] = useState("home")
    const [userinfo, setUserinfo] = useState("")
    const [postList, setPostList] = useState([])
    const [curPost, setCurPost] = useState("")
    const history = useHistory()

    function curPostRead(post) {
        setCurPost(post)
        history.push("/readpost")
    }

    function loginFunc(tk) {
        setIsLogin(true)
    }
    function SignUpFin() {
        history.push("/")
    }
    function curAnimalChange(animaltype) {
        setCurAnimal(animaltype)
    }

    function getPostList(data) {
        function date_descending(a, b) {
            var dateA = new Date(a["updatedAt"]).getTime()
            var dateB = new Date(b["updatedAt"]).getTime()
            return dateA < dateB ? 1 : -1
        }
        setPostList(data.sort(date_descending))
    }

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            axios({
                url: url + "/auth",
                method: "get",
                headers: {
                    authorization: `token ${JSON.parse(
                        localStorage.getItem("accessToken")
                    )}`,
                },
            }).then((res) => {
                setIsLogin(true)
                setUserinfo(res.data.data.userInfo)
                history.push("/")
            })
        }
    }, [localStorage.getItem("accessToken")])

    //회원정보 수정시 프롭스 최신화
    function newUserInfo() {
        if (localStorage.getItem("accessToken")) {
            axios({
                url: url + "/auth",
                method: "get",
                headers: {
                    authorization: `token ${JSON.parse(
                        localStorage.getItem("accessToken")
                    )}`,
                },
            }).then((res) => {
                setIsLogin(true)
                setUserinfo(res.data.data.userInfo)
            })
        }
    }

    return (
        <>
            <GlobalStyle />
            <div className="entire">
                <Switch>
                    <Route exact path="/firstpage">
                        <FirstPage isLogin={isLogin} loginFunc={loginFunc} />
                    </Route>
                    <Route exact path="/signup">
                        <Signup SignUpFin={SignUpFin} />
                    </Route>
                    <Route exact path="/mainpage">
                        <MainPage
                            curAnimalChange={curAnimalChange}
                            getPostList={getPostList}
                            postList={postList}
                            curPostRead={curPostRead}
                            curAnimal={curAnimal}
                            setIsLogin={setIsLogin}
                            setUserinfo={setUserinfo}
                        />
                    </Route>
                    <Route exact path="/board/hamster">
                        <Hamster
                            curAnimalChange={curAnimalChange}
                            getPostList={getPostList}
                            postList={postList}
                            curPostRead={curPostRead}
                            curAnimal={curAnimal}
                            setIsLogin={setIsLogin}
                            setUserinfo={setUserinfo}
                        />
                    </Route>
                    <Route exact path="/board/chick">
                        <Chick
                            curAnimalChange={curAnimalChange}
                            getPostList={getPostList}
                            postList={postList}
                            curPostRead={curPostRead}
                            curAnimal={curAnimal}
                            setIsLogin={setIsLogin}
                            setUserinfo={setUserinfo}
                        />
                    </Route>
                    <Route exact path="/board/parrot">
                        <Parrot
                            curAnimalChange={curAnimalChange}
                            getPostList={getPostList}
                            postList={postList}
                            curPostRead={curPostRead}
                            curAnimal={curAnimal}
                            setIsLogin={setIsLogin}
                            setUserinfo={setUserinfo}
                        />
                    </Route>
                    <Route exact path="/board/rabbit">
                        <Rabbit
                            curAnimalChange={curAnimalChange}
                            getPostList={getPostList}
                            postList={postList}
                            curPostRead={curPostRead}
                            curAnimal={curAnimal}
                            setIsLogin={setIsLogin}
                            setUserinfo={setUserinfo}
                        />
                    </Route>
                    <Route exact path="/board/hedgehog">
                        <Hedgehog
                            curAnimalChange={curAnimalChange}
                            getPostList={getPostList}
                            postList={postList}
                            curPostRead={curPostRead}
                            curAnimal={curAnimal}
                            setIsLogin={setIsLogin}
                            setUserinfo={setUserinfo}
                        />
                    </Route>
                    <Route path="/post">
                        <Post
                            curAnimal={curAnimal}
                            userinfo={userinfo}
                            setIsLogin={setIsLogin}
                            setUserinfo={setUserinfo}
                        />
                    </Route>
                    <Route path="/editpost">
                        <PostEdit
                            curAnimal={curAnimal}
                            userinfo={userinfo}
                            curPost={curPost}
                            setIsLogin={setIsLogin}
                            setUserinfo={setUserinfo}
                        />
                    </Route>
                    <Route path="/readpost">
                        <PostRead curPost={curPost} userinfo={userinfo} />
                    </Route>
                    <Route path="/mypage">
                        <MyPage
                            userinfo={userinfo}
                            setIsLogin={setIsLogin}
                            setUserinfo={setUserinfo}
                            newUserInfo={newUserInfo}
                        />
                    </Route>

                    <Route path="/editpw">
                        <PwdEditPage
                            setIsLogin={setIsLogin}
                            setUserinfo={setUserinfo}
                        />
                    </Route>

                    <Route path="/">
                        {isLogin ? (
                            <Redirect to="/mainpage" />
                        ) : (
                            <Redirect to="/firstpage" />
                        )}
                    </Route>
                </Switch>
            </div>
        </>
    )
}
export default App
