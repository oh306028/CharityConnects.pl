import { useState, useRef, useEffect } from "react";

const CreateOrganization = (props) => {
  const [name, setName] = useState("");

  const organization = {
    name: name,
    adminId: props.userId,
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleOrganizationCreation = (e) => {
    e.preventDefault();
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
          <input
            onChange={handleNameChange}
            type="text"
            placeholder="Nazwa organizacji . . ."
          />
          <button onClick={handleOrganizationCreation} type="submit">
            Zarejestruj organizację
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateOrganization;
