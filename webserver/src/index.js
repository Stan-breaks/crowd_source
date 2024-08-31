const express = require("express");
const cookieParser = require("cookie-parser");
// Removed session import
const app = express();
const port = 3000;
const cors = require("cors");

//database
require("./database");

//env variables config
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Removed session middleware
app.use("/static", express.static("public"));

//token authentification middleware
const authenticateToken = require("./middleware/auth");

//default route
app.get("/", (req, res) => {
  res.send("Welcome to crowd source's backend");
});

//ussdAuth
app.use("/ussdAuth", require("./routes/authUssd"));
//auth routes
app.use("/auth", require("./routes/auth"));
// routes
app.use("/location", authenticateToken, require("./routes/location"));
app.use("/report", authenticateToken, require("./routes/report"));
app.use("/profile", authenticateToken, require("./routes/profile"));

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
