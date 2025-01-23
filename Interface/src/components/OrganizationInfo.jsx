const OrganizationInfo = () => {
  return (
    <>
      <h1 className="logoText">CharityConnects.pl</h1>
      <section>
        Dziękujemy za zainteresowanie się naszym serwisem. Poniższa strona
        przedstawia możliwości organizacji pomocowych współpracujących z naszym
        serwisem.
      </section>
      <p>Krok po kroku, jak zarejestrować swoją organizację:</p>
      <ol>
        <li>Utwórz profil administratora</li>
        <li>Zarejestruj organizację</li>
        <li>Dodawaj swoich pracowników na profilu administratora</li>
        <li>Twórz projekty pomocowe!</li>
      </ol>

      <ul>
        <li>
          <a href="/register/admin">Utwórz profil administratora</a>
        </li>
        <li>
          <a href="/login">Zaloguj jako administrator organizacji</a>
        </li>
      </ul>
      <a href="/">Powrót</a>
    </>
  );
};

export default OrganizationInfo;
