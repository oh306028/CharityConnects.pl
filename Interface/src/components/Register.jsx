import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Register.css";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(10);
  const [role, setRole] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    age: age,
    role: role,
    dateOfBirth: selectedDate,
  };

  const handleRegister = async (e) => {
    e.preventDefault();

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
        alert("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
            <form>
              <div>
                <input
                  onChange={handleFirstNameChange}
                  type="text"
                  placeholder="Imię . . ."
                ></input>
                <input
                  onChange={handleLastNameChange}
                  type="text"
                  placeholder="Nazwisko . . ."
                ></input>
              </div>
              <div>
                <input
                  onChange={handleEmailChange}
                  type="text"
                  placeholder="Email . . ."
                ></input>
                <input
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Hasło . . ."
                ></input>
              </div>
              <div>
                <label htmlFor="date">Data urodzenia: </label>
                <input
                  onChange={handleDateChange}
                  id="id"
                  type="date"
                  value={selectedDate}
                ></input>
              </div>

              <div>
                <label htmlFor="Donor">Darczyńca</label>
                <input
                  type="radio"
                  id="Donor"
                  name="roles"
                  value="Darczyńca"
                  checked={role === "Donor"}
                  onChange={handleRoleChange}
                />

                <label htmlFor="Beneficiary">Beneficjent</label>
                <input
                  type="radio"
                  id="Beneficiary"
                  name="roles"
                  value="Beneficjent"
                  checked={role === "Beneficiary"}
                  onChange={handleRoleChange}
                />
              </div>
              <div>
                <NavLink to="/login" className="loginLink">
                  <p>Masz konto?</p>
                </NavLink>
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
        </div>
      </div>
    </>
  );
};

export default Register;
