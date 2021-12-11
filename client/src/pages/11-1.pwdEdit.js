import Header from "../components/Header"
import Navigation from "../components/Navigation"
import PasswordChange from "./11-2.pwdSection"

export default function PwdEditPage(props) {
    return (
        <>
            <Header
                setIsLogin={props.setIsLogin}
                setUserinfo={props.setUserinfo}
            />
            <Navigation />
            <PasswordChange />
        </>
    )
}
