import { useState } from "react"
import Login from "components/login"

const Auth = () => {
  const [isLogin, setAsLogin] = useState(true)

  const onForgetHandler = () => {
    setAsLogin(!isLogin)
  }

  return <Login isLogin={isLogin} onForget={onForgetHandler} />
}

export default Auth
