import { useState } from "react";
import styles from "../styles/ProjectDetails.module.css";

const ProjectDetails = (props) => {
  const [token, setToken] = useState(props.token);
  const [requirement, setRequirement] = useState("");

  const handleAccept = async (id) => {
    console.log(props.project.id);
    try {
      await fetch(
        `https://localhost:7292/api/projects/${props.project.id}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: id,
        }
      );
    } catch (error) {}
    props.fetchAfterManaged();
  };

  const handleDeny = async () => {
    try {
      await fetch(
        `https://localhost:7292/api/projects/${props.project.id}/deny`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
    } catch (error) {}
    props.fetchAfterManaged();
  };

  const handleRequirementChange = (e) => {
    setRequirement(e.target.value);
  };

  const handleAddRequirement = async () => {
    try {
      await fetch(
        `https://localhost:7292/api/projects/${props.project.id}/requirement`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify(requirement),
        }
      );
    } catch (error) {}
    props.fetchAfterManaged();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>{props.project.name}</h3>
          <p>{props.project.description}</p>
        </div>
        <h4>Wymagania projektu</h4>
        <input
          onChange={handleRequirementChange}
          placeholder="wymaganie . . ."
        ></input>
        <button onClick={handleAddRequirement}>Dodaj</button>
        <ul>
          {props.project.requirements.map((r) => (
            <li key={r.id}>{r.name}</li>
          ))}
        </ul>
        <h4>Beneficjenci projektu</h4>
        <ul>
          {props.project.beneficiaries.map((b) => (
            <li key={b.id}>{b.email}</li>
          ))}
        </ul>
        <h4>Darczyńcy projektu</h4>
        <ul>
          {props.project.donors.map((d) => (
            <li key={d.id}>{d.email}</li>
          ))}
        </ul>
        <h4>Aplikacje projektu</h4>
        <ul>
          {props.project.applications.map(
            (a) =>
              a.isAccepted === false && (
                <li className={styles.applicationContainer} key={a.id}>
                  <div className={styles.descriptionContainer}>
                    <p>{a.beneficiary.email}</p>
                    <span>
                      <b>Opis:</b> {a.description}
                    </span>
                  </div>
                  <button onClick={() => handleAccept(a.beneficiary.id)}>
                    Akceptuj
                  </button>
                  <button onClick={handleDeny}>Odrzuć</button>
                </li>
              )
          )}
        </ul>
        <button>Usuń projekt</button>
      </div>
    </>
  );
};

export default ProjectDetails;
