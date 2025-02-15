import { useEffect, useState } from "react";
import styles from "../styles/ProjectDetails.module.css";

const ProjectDetails = (props) => {
  const [token, setToken] = useState(props.token);
  const [requirement, setRequirement] = useState("");

  useEffect(() => {
    console.log(props);
  });

  const handleAccept = async (id) => {
    try {
      await fetch(
        `https://localhost:7292/api/projects/${props.project.id}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: id,
        }
      );
    } catch (error) {
      console.error("Błąd podczas akceptacji:", error);
    }
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Błąd podczas odrzucenia:", error);
    }
    props.fetchAfterManaged();
  };

  const handleDownload = async (applicationId, fileName) => {
    try {
      const response = await fetch(
        `https://localhost:7292/api/projects/download/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Błąd podczas pobierania pliku");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Błąd podczas pobierania pliku:", error);
    }
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requirement),
        }
      );
    } catch (error) {
      console.error("Błąd podczas dodawania wymagania:", error);
    }
    props.fetchAfterManaged();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{props.project.name}</h3>
        <p>{props.project.description}</p>
      </div>
      <h4>Wymagania projektu</h4>
      <input onChange={handleRequirementChange} placeholder="wymaganie . . ." />
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
            !a.isAccepted && (
              <li className={styles.applicationContainer} key={a.id}>
                <div className={styles.descriptionContainer}>
                  <p>{a.beneficiary.email}</p>
                  <a
                    className={styles.fileLink}
                    onClick={() => handleDownload(a.id, a.fileName)}
                  >
                    {a.fileName}
                  </a>
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
  );
};

export default ProjectDetails;
