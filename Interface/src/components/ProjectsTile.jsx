import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Home";
import useAuth from "../useAuth.jsx";
import styles from "../styles/ProjectsTile.module.css";
import ApplicateForProjectTile from "./ApplicateForProjectTile";

const ProjectsTile = ({ project, getProjects }) => {
  const token = useAuth();
  const user = useContext(UserContext);
  const [isAlreadySupporting, setIsAlreadySupporting] = useState(false);
  const [isApplicationClicked, setIsApplicationClicked] = useState(false);

  const dateTime = new Date(project.endDate);
  const date = dateTime.toLocaleDateString("pl-PL");

  const handleApplicationClick = () => {
    setIsApplicationClicked(!isApplicationClicked);
  };

  useEffect(() => {
    const isSupporting = project.donors.some(
      (donor) => donor.id === user.userData.id
    );
    setIsAlreadySupporting(isSupporting);
  });

  const handleSupportClick = async (projectId) => {
    if (isAlreadySupporting) {
      alert("Wspierasz juz ten post. Dziekujemy!");
    }
    try {
      const response = await fetch(
        `https://localhost:7292/api/projects/${projectId}/support`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        getProjects();
        console.log("Wspierasz!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.tile}>
        <div className={styles.titleContainer}>
          <h2 className={styles.projectName}>{project.name}</h2>
          <p>Kończy się: {date}</p>
          <h4 className={styles.organization}>Organizacja</h4>
        </div>
        {user.userData.role === 3 && (
          <>
            <div className={styles.requirementContainer}>
              <h5>Wymagania aplikacji:</h5>
              {project.requirements.length === 0 && <h5>Brak</h5>}

              <ul>
                {project.requirements.map((i) => (
                  <li key={i.id}>
                    <p>{i.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        <p className={styles.description}>{project.description}</p>
        <p className={styles.supportedBy}>
          Wspierany przez: {project.donors.length} darczyńców
          <br></br>
          Pomoc otrzymują: {project.beneficiaries.length} beneficjentów
        </p>
        {user.userData.role === 3 && (
          <button onClick={handleApplicationClick}>Aplikuj</button>
        )}
        {user.userData.role === 2 && (
          <button onClick={() => handleSupportClick(project.id)}>
            {isAlreadySupporting != true ? "Wspieraj" : "Wspierasz"}
          </button>
        )}

        {isApplicationClicked && (
          <ApplicateForProjectTile
            projectId={project.id}
            userId={user.userData.id}
            applications={project.applications}
          />
        )}
      </div>
    </>
  );
};

export default ProjectsTile;
