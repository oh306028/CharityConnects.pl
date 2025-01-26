import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const RegisterEmployee = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(10);
  const [organizationId, setOrganizationId] = useState(props.organizationId);
  const [role, setRole] = useState("Employee");
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
    organizationId: organizationId,
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
          props.fetchEmployees();
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
      <div className="form-container">
        <form>
          <div className="row">
            <div className="inputGroup">
              <input
                onChange={handleFirstNameChange}
                type="text"
                placeholder="Imię . . ."
              ></input>
              {error.firstName && (
                <span className="error">{error.firstName}</span>
              )}
            </div>
            <div className="inputGroup">
              <input
                onChange={handleLastNameChange}
                type="text"
                placeholder="Nazwisko . . ."
              ></input>
              {error.lastName && (
                <span className="error">{error.lastName}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="inputGroup">
              <input
                onChange={handleEmailChange}
                type="text"
                placeholder="Email . . ."
              ></input>
              {error.email && <span className="error">{error.email}</span>}
            </div>
            <div className="inputGroup">
              <input
                onChange={handlePasswordChange}
                type="password"
                placeholder="Hasło . . ."
              ></input>
              {error.password && (
                <span className="error">{error.password}</span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="date">Data urodzenia: </label>
            <input
              onChange={handleDateChange}
              id="id"
              type="date"
              value={selectedDate}
            ></input>
            {error.dateOfBirth && (
              <span className="error">{error.dateOfBirth}</span>
            )}
          </div>
          <div className="buttonDiv">
            <button
              className="registerButton"
              onClick={handleRegister}
              type="submit"
            >
              Zarejestruj
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterEmployee;
