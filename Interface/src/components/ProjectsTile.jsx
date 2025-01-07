import { useContext } from "react";
import { UserContext } from "./Home";
import styles from "../styles/ProjectsTile.module.css";

const ProjectsTile = ({ project }) => {
  const user = useContext(UserContext);

  const dateTime = new Date(project.endDate);
  const date = dateTime.toLocaleDateString("pl-PL");
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
        {user.userData.role === 3 && <button>Aplikuj</button>}
        {user.userData.role === 2 && <button>Wspieraj</button>}
      </div>
    </>
  );
};

export default ProjectsTile;
