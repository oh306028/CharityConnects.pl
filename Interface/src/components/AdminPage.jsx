import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Home";
import CreateOrganization from "./CreateOrganization";
import styles from "../styles/AdminPage.module.css";
import useAuth from "../useAuth.jsx";
import EmployeeTile from "./EmployeeTile.jsx";

const AdminPage = () => {
  const { userData } = useContext(UserContext);
  const [isCreateOrgClicked, setIsCreateOrgClicked] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [organizationData, setOrganizationData] = useState({});
  const token = useAuth();

  const handleCreateOrgToggle = () => {
    setIsCreateOrgClicked(!isCreateOrgClicked);
  };

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await fetch("https://localhost:7292/api/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        });
        const result = await response.json();
        setOrganizationData(result);
        setEmployees(result.employees);
      } catch (error) {}
    };
    getEmployees();
  }, [token]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.manageMenu}>
          <h1 className="logoText">Admin page</h1>
          <ul className={styles.menuOptions}>
            <li>
              <p className={styles.option} onClick={handleCreateOrgToggle}>
                Utwórz organizację
              </p>
              {isCreateOrgClicked && (
                <CreateOrganization
                  userId={userData.id}
                  employeesData={organizationData}
                />
              )}
            </li>
            <li>
              <p className={styles.option}>Zarejestruj pracownika</p>
            </li>
          </ul>
        </div>

        <div className={styles.employeesList}>
          <h2>Pracownicy</h2>

          <ul className={styles.employees}>
            {employees.map((emp) => (
              <li key={emp.id}>
                <EmployeeTile
                  firstName={emp.firstName}
                  lastName={emp.lastName}
                  email={emp.email}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
