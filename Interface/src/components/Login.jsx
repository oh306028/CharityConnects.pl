import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginData = {
    email: email,
    password: password,
  };

  const [notFound, setNotFound] = useState("");
  const [error, setError] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    const areInputsValid = validateInputs();

    if (areInputsValid) {
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
        if (response.status == 404) {
          setNotFound("Błędny email lub hasło");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateInputs = () => {
    setNotFound("");
    let isValid = true;
    const newError = {
      email: "",
      password: "",
    };

    if (email == "") {
      newError.email = "Email nie moze byc pusty!";
      isValid = false;
    }

    if (!email.includes("@")) {
      newError.email = "Email musi byc mailem!";
      isValid = false;
    }

    if (password == "") {
      newError.password = "Haslo nie moze byc puste!";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  return (
    <>
      <div className="container">
        <div className="left-container">
          <h1 className="logoText">CharityConnects.pl</h1>
        </div>
        <div className="right-container">
          <div className="form-container">
            <form className="formularz">
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Adres e-mail</label>
                <input
                  className="form-control" id="exampleInputEmail1"
                  onChange={handleEmailChange}
                  type="text"
                  placeholder="Email . . ."
                ></input>
                {error.email && <span className="error">{error.email}</span>}
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Hasło</label>
                <input
                className="form-control" id="exampleInputPassword1"
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Hasło . . ."
                ></input>
                {error.password && (
                  <span className="error">{error.password}</span>
                )}
                {notFound && <span className="error">{notFound}</span>}
              </div>
              <div>
                <NavLink className="loginLink"  to="/register">
                  <p>Nie masz konta?</p>
                </NavLink>
              </div>
              <div className="buttonDiv">
                <button id="loguj"
                  className="btn btn-primary"
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
