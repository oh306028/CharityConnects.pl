import styles from "../styles/NavigationBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    alert("Wylogowano");
  };
  return (
    <>
      <div className={styles.navBar}>
        <div className={` ${styles.guzik0}`}>
          <h3 className={styles.logo}>CharityConnects</h3>
        </div>
        <div className={styles.navigationContainer}>
          <NavLink className={`btn btn-primary ${styles.guzik0}`} to="/Home">
            <h4 className={styles.logo}>Projekty</h4>
          </NavLink>
          <NavLink className={`btn btn-primary ${styles.guzik0}`} to="/#">
          <h4 className={styles.logo}>Profil</h4>
          </NavLink>
          <NavLink className={`btn btn-primary ${styles.guzik0}`} to="/login" onClick={handleLogout}>
            <h4 className={styles.logo}>Wyloguj</h4>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
