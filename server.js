const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/send-user-data.js", (req, res) => {
  const filePath = path.join(__dirname, "send-user-data.js");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Błąd serwera");
      return;
    }
    res.setHeader("Content-Type", "application/javascript");
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
