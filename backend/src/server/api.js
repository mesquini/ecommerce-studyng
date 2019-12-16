require("dotenv").config();

const cors = require("cors");
const routers = require("../router.js");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookeiParser = require('cookie-parser')
const helmte = require('helmet')

require("../database");

const app = express();
const server = require("http").Server(app);

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(routers);
app.use(morgan("dev"));
app.use(cookeiParser())
app.use(helmte())
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "..", "tmp", "uploads"))
);

server.listen(process.env.PORT || 3333);
