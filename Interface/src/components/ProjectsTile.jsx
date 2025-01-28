import { useContext, useState } from "react";
import { UserContext } from "./Home";
import styles from "../styles/ProjectsTile.module.css";
import ApplicateForProjectTile from "./ApplicateForProjectTile";

const ProjectsTile = ({ project }) => {
  const user = useContext(UserContext);
  const [isApplicationClicked, setIsApplicationClicked] = useState(false);

  const dateTime = new Date(project.endDate);
  const date = dateTime.toLocaleDateString("pl-PL");

  const handleApplicationClick = () => {
    setIsApplicationClicked(!isApplicationClicked);
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
          Wspierany przez: {project.beneficiaries.length} darczyńców
        </p>
        {user.userData.role === 3 && (
          <button onClick={handleApplicationClick}>Aplikuj</button>
        )}
        {user.userData.role === 2 && <button>Wspieraj</button>}

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
