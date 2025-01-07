import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginData = {
    email: email,
    password: password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://localhost:7292/api/accounts/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );
      if (response.ok) {
        localStorage.setItem("jwtToken", await response.text());
        navigate("/Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="left-container">
          <h1 className="logoText">CharityConnects.pl</h1>
        </div>
        <div className="right-container">
          <div className="form-container">
            <form>
              <div>
                <input
                  onChange={handleEmailChange}
                  type="text"
                  placeholder="Email . . ."
                ></input>
              </div>
              <div>
                <input
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Hasło . . ."
                ></input>
              </div>
              <div>
                <NavLink className="loginLink" to="/register">
                  <p>Nie masz konta?</p>
                </NavLink>
              </div>
              <div className="buttonDiv">
                <button
                  className="registerButton"
                  onClick={handleLogin}
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
