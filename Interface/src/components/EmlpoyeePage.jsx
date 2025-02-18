import { useState } from "react";
import { useEffect } from "react";
import useAuth from "../useAuth.jsx";
import ProjectDetails from "./ProjectDetails.jsx";
import styles from "../styles/EmlpoyeePage.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const EmployeePage = () => {
  const navigate = useNavigate();
  const token = useAuth();
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://localhost:7292/api/projects/organization",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setProjects(result);
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const navigateToCreate = () => {
    navigate("/employee/manage/create");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    alert("Wylogowano");
    navigate("/login");
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <>
      <div className={styles.container1}>
        <div className={styles.navbar}>
          <p className={styles.akap1}>CharityConnects</p>
          <p className={`btn btn-primary ${styles.logout}`} onClick={handleLogout}>Wyloguj</p>
        </div>  
        <div className={styles.container2}>
          <div className={styles.leftContainer}>
            <h1 className={styles.logoText}>CharityConnects.pl</h1>
            <div className={styles.tekst}>
              CharityConnects.pl to idealny serwis, który łączy beneficjentów i
              darczyńców poprzez organizacje charytatywne. Dzięki naszej
              platformie masz możliwość realnego wpływu na życie ludzi, którzy
              najbardziej tego potrzebują. Jako pracownik, możesz współtworzyć
              rozwiązania, które ułatwiają proces wsparcia, budują zaufanie oraz
              usprawniają komunikację między wszystkimi zaangażowanymi stronami.
              Dołącz do naszej misji i pomóż nam rozwijać narzędzia, które
              zmieniają świat na lepsze – razem możemy więcej!
            </div>
            <button onClick={navigateToCreate} className={`btn btn-primary ${styles.button1}`}>
              Utwórz nowy projekt
            </button>
          </div>
          <div className={styles.rightContainer}>
            <ul>
              {projects.map((p) => (
                <li key={p.id}>
                  <ProjectDetails
                    project={p}
                    token={token}
                    fetchAfterManaged={fetchData}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeePage;
