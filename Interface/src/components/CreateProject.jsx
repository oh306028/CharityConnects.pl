import { useState } from "react";
import styles from "../styles/CreateProject.module.css";
import useAuth from "../useAuth.jsx";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();
  const token = useAuth();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState({
    name: "",
    description: "",
  });

  const projectData = {
    name: projectName,
    description: projectDescription,
    startDate: startDate,
    endDate: endDate,
  };

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const validateInputs = () => {
    const newError = { name: "", description: "" };
    let isValid = true;

    if (projectName === "") {
      newError.name = "Nazwa projektu nie moze byc pusta!";
      isValid = false;
    }

    if (projectDescription === "") {
      newError.description = "Opis projektu nie moze byc pusty!";
      isValid = false;
    }
    setError(newError);
    return isValid;
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const response = validateInputs();

    if (response) {
      try {
        const response = await fetch("https://localhost:7292/api/projects/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(projectData),
        });
        if (response.ok) {
          alert("Utworzono projekt");
          navigate("/Home");
        }
      } catch (error) {}
    }
  };

  return (
    <>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <h1 className="logoText">CharityConnects.pl</h1>
          </div>
          <div className={styles.rightContainer}>
          <div className="right-container">
            <div className="form-container">
              <form className="formularz">
                <div className="mb-3">
                  <label htmlFor="projectName" className="form-label">Nazwa projektu</label>
                  <input
                    className="form-control"
                    id="projectName"
                    onChange={handleNameChange}
                    type="text"
                    placeholder="Nazwa projektu . . ."
                  />
                  {error.name && <span className="error">{error.name}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Opis projektu</label>
                  <textarea
                    className="form-control"
                    id="description"
                    onChange={handleDescriptionChange}
                    placeholder="Opis projektu . . ."
                  />
                  {error.description && <span className="error">{error.description}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="start" className="form-label">Data rozpoczęcia</label>
                  <input
                    className="form-control"
                    id="start"
                    onChange={handleStartDateChange}
                    type="date"
                    value={startDate}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="end" className="form-label">Data zakończenia</label>
                  <input
                    className="form-control"
                    id="end"
                    onChange={handleEndDateChange}
                    type="date"
                    value={endDate}
                  />
                </div>

                <div className="buttonDiv">
                  <button className={`btn btn-primary ${styles.stworz}`} onClick={handleCreate} type="submit">
                    Stwórz
                  </button>
                </div>
              </form>

              <div>
                <a className={`btn btn-primary ${styles.powrot}`} href="/Home">Powrót</a>
              </div>
            </div>
          </div>
          </div>
        </div>
    </>
  );
};

export default CreateProject;
