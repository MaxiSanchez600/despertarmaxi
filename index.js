const { exec } = require("child_process");
const axios = require("axios");
const port = process.env.PORT || 3001;
var express = require("express");
var app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Acces-Contorl-Allow-Methods", "Content-Type", "Authorization");
  next();
});
app.post("/open", async function (req, res) {
  const { name, message } = req.body;
  const response = await axios.post("http://181.12.248.55:8080/open", {
    name: name,
    message: message,
  });
  if (response.data) {
    res.send("success");
  } else {
    res.status(400).send("error");
  }
});

app.post("/youtube", async function (req, res) {
  const { name, message, link } = req.body;
  const response = await axios.post("http://181.12.248.55:8080/youtube", {
    name: name,
    message: message,
    link: link,
  });
  if (response.data) {
    res.send("success");
  } else {
    res.status(400).send("error");
  }
});

app.get("/health", async function (req, res) {
  const response = await axios.get("http://181.12.248.55:8080/health");
  if (response.data) {
    res.send("ONLINE");
  } else {
    res.status(400).send("error");
  }
});

app.listen(port);
