import { useState, useRef, useEffect } from "react";
import useAuth from "../useAuth.jsx";

const CreateOrganization = (props) => {
  const token = useAuth();
  const [name, setName] = useState("");
  const adminId = useRef(0);
  const [employeesData, setEmployeesData] = useState({});

  const organization = {
    name: name,
    adminId: props.userId,
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const getOrganization = async () => {
      try {
        const response = await fetch("https://localhost:7292/api/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        });
        const result = await response.json();
        setEmployeesData(result);
      } catch (error) {}
    };
    getOrganization();
  }, [token]);

  const handleOrganizationCreation = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {employeesData.organizationName ? (
        <>
          <p>Zarejestrowano już organizację:</p>
          <h1>{employeesData.organizationName}</h1>
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
