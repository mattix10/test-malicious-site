(function () {
  // Funkcja sprawdzająca bieżący URL
  function checkPage() {
    if (window.location.pathname === "/") {
      console.log("Podstrona zmieniona na /test");
    }
  }

  // Nasłuchiwanie na zmiany w historii przeglądarki (pushState, replaceState)
  (function (history) {
    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function (state) {
      if (typeof history.onpushstate == "function") {
        history.onpushstate({ state: state });
      }
      const result = pushState.apply(history, arguments);
      window.dispatchEvent(new Event("pushstate"));
      return result;
    };

    history.replaceState = function (state) {
      if (typeof history.onreplacestate == "function") {
        history.onreplacestate({ state: state });
      }
      const result = replaceState.apply(history, arguments);
      window.dispatchEvent(new Event("replacestate"));
      return result;
    };

    window.addEventListener("popstate", checkPage);
    window.addEventListener("pushstate", checkPage);
    window.addEventListener("replacestate", checkPage);
  })(window.history);

  // Początkowe sprawdzenie strony
  checkPage();

  // Dodatkowe sprawdzenie przy zmianie hash
  window.addEventListener("hashchange", checkPage);
})();
