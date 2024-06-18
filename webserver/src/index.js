const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const port = 3000;
const cors = require("cors");

//database
require("./database");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "fdslajfsnfdsjsdaclcdsmcdskmsmmdsl",
    resave: true,
    saveUninitialized: true,
  }),
);
app.use("/static", express.static("public"));

//
app.get("/", (req, res) => {
  res.send("Hello World");
});

//ussdAuth
app.use("/ussdAuth", require("./routes/authUssd"));

//auth routes
app.use("/auth", require("./routes/auth"));

// routes
app.use("/location", require("./routes/location"));
app.use("/report", require("./routes/report"));
app.use("/profile", require("./routes/profile"));

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
