function trigger() {
  const userToken = localStorage.getItem("token");

  fetch("http://localhost:3000/user-token", {
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
