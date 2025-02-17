import "../styles/OrganizationInfo.css";
const OrganizationInfo = () => {
  return (
    <>
      <div className="container-fluid parent d-flex flex-column">
      <h1 className="logoText">CharityConnects.pl</h1>
      <div className="info">
        <p>
        Dziękujemy za zainteresowanie się naszym serwisem. Poniższa strona
        przedstawia możliwości organizacji pomocowych współpracujących z naszym
        serwisem.
        </p>
      </div>
      <div className="steps">
        <p>Krok po kroku, jak zarejestrować swoją organizację:</p>
        <br></br>
        <ol>
          <li>Utwórz profil administratora</li>
          <li>Zarejestruj organizację</li>
          <li>Dodawaj swoich pracowników na profilu administratora</li>
          <li>Twórz projekty pomocowe!</li>
        </ol>
      </div>
      <div className="container-fluid d-flex justify-content-evenly guziki">
          <a className="btn btn-primary guzik" href="/register/admin">Utwórz profil administratora</a>
          <a className="btn btn-primary guzik" href="/login">Zaloguj jako administrator organizacji</a>
      </div>
      <div className="stopka container-fluid d-flex justify-content-center">
      <a className="btn btn-primary guzikpowrotu" href="/">Powrót</a>
      </div>
      </div>
    </>
  );
};

export default OrganizationInfo;
