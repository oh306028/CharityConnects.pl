import styles from "../styles/EmployeeTile.module.css";

const EmployeeTile = (props) => {
  const handleDeleteEmployee = async () => {
    try {
      const response = await fetch(
        `https://localhost:7292/api/employees/${props.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${props.token}`,
          },
        }
      );
      if (response.ok) {
        props.fetchEmployees();
      }
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.employeeName}>
          {props.firstName} {props.lastName}
        </h1>
        <p>{props.email}</p>
        <button onClick={handleDeleteEmployee} className={styles.deleteButton}>
          Zwolnij
        </button>
      </div>
    </>
  );
};

export default EmployeeTile;
