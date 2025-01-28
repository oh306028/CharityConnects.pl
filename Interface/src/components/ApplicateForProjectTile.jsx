import { useEffect, useState } from "react";
import styles from "../styles/ApplicateForProjectTile.module.css";
import useAuth from "../useAuth.jsx";

const ApplicateForProjectTile = (props) => {
  const token = useAuth();
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [userId, setUserId] = useState(props.userId);
  const [applications, setApplications] = useState(props.applications);

  useEffect(() => {
    validApplication();
  }, []);

  const validApplication = () => {
    const existingApplication = applications.some(
      (application) => application.beneficiary.id === userId
    );

    const acceptedValidation = applications.some(
      (applicaiton) =>
        applicaiton.beneficiary.id === userId && applicaiton.isAccepted === true
    );

    setIsAccepted(acceptedValidation);
    setIsAlreadyApplied(existingApplication);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    console.log(applications);
    if (isAccepted) {
      alert("Aplikacja została zaakceptowana!");
    } else if (isAlreadyApplied) {
      alert("Aplikacja oczekuje już na zaakceptowanie!");
    } else {
      const fileInput = document.getElementById("file");
      const file = fileInput.files[0];

      if (!file) {
        alert("Proszę załączyć plik!");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(
          `https://localhost:7292/api/projects/${props.projectId}/apply`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          alert("Aplikacja wysłana pomyślnie!");
          window.location.reload();
        } else {
          alert("Wystąpił błąd podczas wysyłania aplikacji.");
        }
      } catch (error) {
        console.log(error);
        alert("Wystąpił błąd podczas połączenia z serwerem.");
      }
    }
  };
  return (
    <>
      <div className={styles.container}>
        <h4>Aplikacja na projekt</h4>
        <div className={styles.formContainer}>
          <form>
            <div>
              <label htmlFor="file">Załącz dokument</label>
            </div>

            <input id="file" type="file"></input>
            <button type="submit" onClick={handleApplication}>
              {isAccepted
                ? "Zaakceptowano"
                : isAlreadyApplied
                ? "Zaaplikowano"
                : "Wyślij"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplicateForProjectTile;
