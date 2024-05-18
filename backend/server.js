require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbconfig = require("./Config/dbConfig");
const userRoutes = require("./Routes/userRoutes");

app.use(express.json());

app.use("/users", userRoutes);
const port = process.env.PORT || 8090;

app.listen(port, () => console.log(`Node server started at ${port}`));

module.exports = app;
