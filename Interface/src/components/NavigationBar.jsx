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
        <div>
          <h3 className={styles.logo}>CharityConnects.pl</h3>
        </div>
        <div className={styles.navigationContainer}>
          <NavLink to="/Home">
            <h4>Projekty</h4>
          </NavLink>

          <h4>Profil</h4>
          <NavLink to="/login" onClick={handleLogout}>
            <h4>Wyloguj</h4>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
