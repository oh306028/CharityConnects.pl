import styles from "../styles/NavigationBar.module.css";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
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
          <NavLink to="/">
            <h4>O nas</h4>
          </NavLink>
          <h4>Profil</h4>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
