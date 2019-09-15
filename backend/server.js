const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/greetings", (req, res) => {
  res.send({ express: "Hello, this is a base project structure for a number to word converter app."})
});

app.listen(port, () => console.log(`Listening on port ${port}`));