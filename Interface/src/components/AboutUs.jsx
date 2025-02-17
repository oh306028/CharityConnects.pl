import "../styles/AboutUs.css";
const AboutUs = () => {
  return (
    <>
      <div class="header container-fluid"
      >
        <a class="navbar-brand" href="#">CharityConnects</a>
        <a href="/login" class="btn btn-primary">Pracownicy</a>
        <a href="/organizations" class="btn btn-primary">Organizacje</a>
      </div>
      <div class="content container-fluid"
      >
        <h1 className="logoText">CharityConnects.pl</h1>

        <p class="firstText"
        >
          Witaj na platformie <strong>CharityConnects.pl</strong> – miejscu,
          które łączy potrzebujących z darczyńcami. Nasza misja to tworzenie
          pomostu między osobami, które potrzebują wsparcia, a tymi, którzy chcą
          pomagać. Razem możemy zmieniać życie i budować lepszą przyszłość.
        </p>

        <section class="sectionOne" 
        >
          <h2
          >
            Jak działamy?
          </h2>
          <ul
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

        <section class="sectionOne" id="secondSection"
          
        >
          <h2
          >
            Dlaczego warto dołączyć?
          </h2>
          <ul
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
      </div>
      <div className="botDiv container-fluid">
          <a className="btn btn-primary" id="dolacz"
            href="/register"
          >
            Dołącz do nas
          </a>
        </div>
    </>
  );
};

export default AboutUs;
