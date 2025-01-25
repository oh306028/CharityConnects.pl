import styles from "../styles/EmployeeTile.module.css";

const EmployeeTile = (props) => {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.employeeName}>
          {props.firstName} {props.lastName}
        </h1>
        <p>{props.email}</p>
        <button className={styles.deleteButton}>Zwolnij</button>
      </div>
    </>
  );
};

export default EmployeeTile;
