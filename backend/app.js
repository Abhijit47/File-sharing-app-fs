const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const fileRouter = require('./routes/fileRoutes');

dotenv.config({ path: "./config.env" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to file sharing API." });
});

app.use("/api/v1", fileRouter);

app.all("*", (req, res, next) => {
  res.status(400).json(`Can't ${req.method} request on ${req.originalUrl} URL.`);
});

module.exports = app;