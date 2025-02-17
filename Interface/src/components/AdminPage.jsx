import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Home";
import CreateOrganization from "./CreateOrganization";
import styles from "../styles/AdminPage.module.css";
import "../styles/AdminPage.module.css";
import useAuth from "../useAuth.jsx";
import EmployeeTile from "./EmployeeTile.jsx";
import RegisterEmployee from "./RegisterEmployee.jsx";

const AdminPage = () => {
  const { userData } = useContext(UserContext);
  const [isCreateOrgClicked, setIsCreateOrgClicked] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [organizationData, setOrganizationData] = useState({});
  const token = useAuth();
  const [isRegisterEmployeeClicked, setIsRegisterEmployeeClicked] =
    useState(false);

  const handleCreateOrgToggle = () => {
    setIsCreateOrgClicked(!isCreateOrgClicked);
  };

  const handleRegisterEmployeeToggle = () => {
    setIsRegisterEmployeeClicked(!isRegisterEmployeeClicked);
  };

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

  useEffect(() => {
    getEmployees();
  }, [token]);

  return (
            <>
        <div className={`container-fluid min-vh-100 d-flex flex-row align-items-start ${styles.container}`}>
          <div className={` ${styles.manageMenu}`}>
            <h1 className={styles.logoText}>Administrator organizacji</h1>
            <div className={styles.menuOptions}>
              <div className={`btn btn-primary ${styles.optiondiv1}`}>
                <p className={`${styles.option}`} onClick={handleCreateOrgToggle}>
                  Utwórz organizację
                </p>
                {isCreateOrgClicked && (
                  <CreateOrganization userId={userData.id} employeesData={organizationData} />
                )}
              </div>
              <div className={`btn btn-primary ${styles.optiondiv2}`}>
                <p className={styles.option} onClick={handleRegisterEmployeeToggle}>
                  Zarejestruj pracownika
                </p>
                {isRegisterEmployeeClicked && (
                  <RegisterEmployee organizationId={organizationData.organizationId} fetchEmployees={getEmployees} />
                )}
              </div>
            </div>
          </div>
              
          <div className={styles.employeesList}>
            <h2 className={styles.header2}>Pracownicy</h2>
            <ul className={styles.employees}>
              {employees.map((emp) => (
                <li key={emp.id}>
                  <EmployeeTile
                    id={emp.id}
                    firstName={emp.firstName}
                    lastName={emp.lastName}
                    email={emp.email}
                    fetchEmployees={getEmployees}
                    token={token}
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
