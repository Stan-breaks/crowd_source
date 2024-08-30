const mongoose = require("mongoose");
const dburi = process.env.DBURI;
mongoose
  .connect(dburi)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
