import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Register.css";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(10);
  const [role, setRole] = useState("Donor");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    age: age,
    role: role,
    dateOfBirth: selectedDate,
  };

  const validateInputs = () => {
    let isValid = true;
    const newError = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dateOfBirth: "",
    };

    if (firstName === "") {
      newError.firstName = "Imie nie moze byc puste!";
      isValid = false;
    }

    if (lastName === "") {
      newError.lastName = "Nazwisko nie moze byc puste!";
      isValid = false;
    }

    if (email === "") {
      newError.email = "Email nie moze byc pusty!";
      isValid = false;
    }

    if (!email.includes("@")) {
      newError.email = "Email musi byc mailem!";
      isValid = false;
    }

    if (selectedDate === "") {
      error.dateOfBirth = "Data urodzenia nie może być pusta!";
      isValid = false;
    }

    if (password === "") {
      newError.password = "Haslo nie moze byc puste!";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const areInputsValid = validateInputs();

    if (areInputsValid) {
      try {
        const response = await fetch(
          "https://localhost:7292/api/accounts/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );
        if (response.ok) {
          alert("Registration successfull! Please log in.");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value.trimStart());
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value.trimStart());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trimStart());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trimStart());
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.id);
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
            <label htmlFor="firstName" className="form-label">Imię</label>
            <input
              className="form-control"
              id="firstName"
              onChange={handleFirstNameChange}
              type="text"
              placeholder="Imię . . ."
            />
            {error.firstName && <span className="error">{error.firstName}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Nazwisko</label>
            <input
              className="form-control"
              id="lastName"
              onChange={handleLastNameChange}
              type="text"
              placeholder="Nazwisko . . ."
            />
            {error.lastName && <span className="error">{error.lastName}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Adres e-mail</label>
            <input
              className="form-control"
              id="email"
              onChange={handleEmailChange}
              type="text"
              placeholder="Email . . ."
            />
            {error.email && <span className="error">{error.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Hasło</label>
            <input
              className="form-control"
              id="password"
              onChange={handlePasswordChange}
              type="password"
              placeholder="Hasło . . ."
            />
            {error.password && <span className="error">{error.password}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Data urodzenia</label>
            <input
              className="form-control"
              id="date"
              type="date"
              onChange={handleDateChange}
              value={selectedDate}
            />
            {error.dateOfBirth && <span className="error">{error.dateOfBirth}</span>}
          </div>
          <div className="roles">
            <label className="form-label">Rola</label>
            <div className="insideRoles d-flex align-items-center gap-3">
              <div className="form-check">
                <input className = "form-check-input" 
                  type="radio"
                  id="Donor"
                  name="roles"
                  value="Darczyńca"
                  checked={role === "Donor"}
                  onChange={handleRoleChange}
                />
                <label className="form-check-label" htmlFor="Donor">Darczyńca</label>
              </div>
              <div className="form-check">
                <input className = "form-check-input"
                  type="radio"
                  id="Beneficiary"
                  name="roles"
                  value="Beneficjent"
                  checked={role === "Beneficiary"}
                  onChange={handleRoleChange}
                />
                <label className="form-check-label" htmlFor="Beneficiary">Beneficjent</label>
              </div>
            </div>
          </div>
          <div>
            <NavLink className="loginLink" to="/login">
              <p>Masz konto?</p>
            </NavLink>
          </div>
          <div className="buttonDiv">
            <button id="zarejestruj"
              className="btn btn-primary"
              onClick={handleRegister}
              type="submit"
            >
              Zarejestruj
            </button>
          </div>
        </form>
      </div>
    </div>
      </div>
    </>
  );
};

export default Register;
