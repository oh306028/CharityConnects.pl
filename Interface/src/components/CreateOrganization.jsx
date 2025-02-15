import { useState, useRef, useEffect } from "react";
import styles from "../styles/CreateOrganization.module.css";
import useAuth from "../useAuth.jsx";

const CreateOrganization = (props) => {
  const [name, setName] = useState("");
  const token = useAuth();
  const [error, setError] = useState({});

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const validInputs = () => {
    let isValid = true;
    const newError = {
      name: "",
    };

    if (name === "") {
      isValid = false;
      newError.name = "Nazwa organizacji nie może być pusta!";
    }
    setError(newError);
    return isValid;
  };

  const handleOrganizationCreation = async (e) => {
    e.preventDefault();
    const validationStatus = validInputs();
    if (validationStatus) {
      try {
        const response = await fetch(
          `https://localhost:7292/api/organization`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
            body: JSON.stringify(name),
          }
        );

        if (response.ok) {
          window.location.reload();
        }
      } catch (error) {}
    }
  };

  return (
    <div>
      {props.employeesData.organizationName ? (
        <>
          <p>Zarejestrowano już organizację:</p>
          <h1>{props.employeesData.organizationName}</h1>
        </>
      ) : (
        <form>
          <div>
            <input
              className={styles.input}
              onChange={handleNameChange}
              type="text"
              placeholder="Nazwa organizacji . . ."
            />
          </div>
          {error.name && <span className="error">{error.name}</span>}
          <button
            onClick={handleOrganizationCreation}
            type="submit"
            className={styles.button}
          >
            Zarejestruj organizację
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateOrganization;
