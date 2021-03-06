const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./dist/groshy"));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/groshy" });
});

app.listen(process.env.PORT || 8080);
