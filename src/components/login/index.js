import InputField from "components/inputfield"
import Button from "components/button"
import "./style.scss"

const Login = ({ isLogin, onForget }) => (
  <div className="login flex">
    <div className="login-title flex flex-column">
      <span>{isLogin ? "WELCOME TO ADMIN" : "RESET PASSWORD"}</span>
      <p>or</p>
      <div className="login-forget" onClick={onForget}>
        {isLogin ? "Forget Password?" : "Back to Login"}
      </div>
    </div>
    <div className="login-decoration flex"></div>
    <div className="login-wrap flex flex-column">
      <InputField name="Email" />
      <InputField name="Password" />
      <Button>Login</Button>
    </div>
  </div>
)

export default Login
