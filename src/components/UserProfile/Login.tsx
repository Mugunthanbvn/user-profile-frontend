import React, { useEffect, useState } from "react";
import { ELoginStatus, LoginService } from "../../services/login";
import { Button } from "../CustomComponents/Button";
import { InputField, InputValueType } from "../CustomComponents/InputField";
import { withSpalashScreen } from "../SplashScreen";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const loginHandler = () => {
    LoginService.login({ email, password })
      .then((status) => {
        if (status === ELoginStatus.sucess) {
          navigate("/profile");
        }
      })
      .catch((e) => {
        setError(e.toString());
      });
  };
  useEffect(() => {
    if (LoginService.currentUserData) navigate("/profile");
  }, []);
  const renderLoginContainer = () => {
    return (
      <div className="login-container">
        <div className="login-title-container">
          <span className="greeting-text">Welcome</span>
          <span className="login-text">Login</span>
        </div>
        <div className="login-body">
          <div className="login-fields">
            <InputField
              title="Email"
              value={email}
              onValueUpdate={(value: InputValueType) => {
                setEmail(value as string);
              }}
              type="email"
              placeholder={"Enter email"}
              isRequired={true}
              minLength={1}
            />
            <InputField
              title="Password"
              value={password}
              type={"password"}
              onValueUpdate={(value: InputValueType) => {
                setPassword(value as string);
              }}
              placeholder={"Enter password"}
              isRequired={true}
              minLength={8}
            />
          </div>

          <a className="login-forgot-password" onClick={() => {}}>
            Forgot password?
          </a>
        </div>
        {error && <div className="login-error">{error}</div>}
        <Button label="Login" type={"submit"} onClick={loginHandler} />
        <div className="login-signup">
          <span>Don’t have an account ?</span>
          <a href="/register">Sign up</a>
        </div>
      </div>
    );
  };
  return withSpalashScreen(renderLoginContainer());
};
export default Login;
