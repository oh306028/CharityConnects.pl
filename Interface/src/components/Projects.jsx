import { useEffect, useState } from "react";
import ProjectsTile from "./ProjectsTile";
import NavigationBar from "./NavigationBar";
import styles from "../styles/Projects.module.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://localhost:7292/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      setProjects(result);
    };
    fetchData();
    console.log(projects);
  }, []);

  return (
    <>
      <NavigationBar />
      <div className={styles.container}>
        <ul>
          {projects.map((i) => (
            <ProjectsTile project={i} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Projects;
