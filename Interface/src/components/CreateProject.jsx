import styles from "../styles/CreateProject.module.css";

const CreateProject = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <h1 className="logoText">CharityConnects.pl</h1>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.inputContainer}>
            <form className={styles.form}>
              <div className={styles.name}>
                <input type="text" placeholder="Nazwa projektu . . ."></input>
              </div>
              <div className={styles.description}>
                <textarea placeholder="Opis projektu . . ."></textarea>
              </div>
              <div>
                <label htmlFor="start">Data rozpoczęcia</label>
                <input id="start" type="date"></input>
              </div>
              <div>
                <label htmlFor="end">Data zakończenia</label>
                <input id="end" type="date"></input>
              </div>

              <button type="submit">Stwórz</button>
            </form>
            <a href="/Home">Powrót</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
