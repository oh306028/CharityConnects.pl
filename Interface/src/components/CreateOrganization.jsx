import { useState, useRef, useEffect } from "react";
import styles from "../styles/CreateOrganization.module.css";
import useAuth from "../useAuth.jsx";

const CreateOrganization = (props) => {
  const [name, setName] = useState("");
  const token = useAuth();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleOrganizationCreation = async (e) => {
    try {
      const response = await fetch(`https://localhost:7292/api/organization`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify(name),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {}
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
