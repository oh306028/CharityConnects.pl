const AboutUs = () => {
  return (
    <>
      <div>
        <a href="/login">Pracownicy</a>
        <a href="/organizations">Organizacje</a>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 className="logoText">CharityConnects.pl</h1>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: "#333",
            margin: "20px auto",
            maxWidth: "800px",
          }}
        >
          Witaj na platformie <strong>CharityConnects.pl</strong> – miejscu,
          które łączy potrzebujących z darczyńcami. Nasza misja to tworzenie
          pomostu między osobami, które potrzebują wsparcia, a tymi, którzy chcą
          pomagać. Razem możemy zmieniać życie i budować lepszą przyszłość.
        </p>

        <section
          style={{ margin: "40px auto", maxWidth: "800px", textAlign: "left" }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              color: "white",
              marginBottom: "10px",
            }}
          >
            Jak działamy?
          </h2>
          <ul
            style={{
              fontSize: "1rem",
              lineHeight: "1.8",
              color: "#333",
              paddingLeft: "20px",
            }}
          >
            <li>
              Organizacje charytatywne tworzą projekty pomocowe w naszym
              serwisie.
            </li>
            <li>
              Każdy projekt jest starannie weryfikowany, aby zapewnić
              transparentność i skuteczność.
            </li>
            <li>
              Darczyńcy mogą przeglądać projekty, wybierać te, które chcą
              wesprzeć, i dokonywać darowizn.
            </li>
            <li>
              Beneficjenci otrzymują niezbędne wsparcie, które zmienia ich życie
              na lepsze.
            </li>
          </ul>
        </section>

        <section
          style={{ margin: "40px auto", maxWidth: "800px", textAlign: "left" }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              color: "white",
              marginBottom: "10px",
            }}
          >
            Dlaczego warto dołączyć?
          </h2>
          <ul
            style={{
              fontSize: "1rem",
              lineHeight: "1.8",
              color: "#333",
              paddingLeft: "20px",
            }}
          >
            <li>Masz możliwość realnego wpływu na życie innych.</li>
            <li>
              Zapewniamy pełną przejrzystość i raportowanie, abyś wiedział,
              gdzie trafiają Twoje darowizny.
            </li>
            <li>
              Dołączając do naszej społeczności, stajesz się częścią większego
              celu – budowania lepszego świata.
            </li>
          </ul>
        </section>

        <div style={{ marginTop: "40px" }}>
          <a
            href="/register"
            style={{
              display: "inline-block",
              background: "#007BFF",
              color: "white",
              padding: "15px 30px",
              fontSize: "1rem",
              textDecoration: "none",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Dołącz do nas
          </a>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
