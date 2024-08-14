const { Router } = require("express");
const router = Router();
const Report = require("../database/schemas/Report");
const User = require("../database/schemas/User");
const Location = require("../database/schemas/Location");

router.get("/", async (req, res) => {
  const reports = await Report.find();
  if (reports) {
    res.status(200).send(reports);
  } else {
    res.status(200).send([]);
  }
});

router.post("/:userName", async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ userName });
  const { disease, cases, deaths, population, description, address } = req.body;
  const location = await Location.findOne({ $or: [{ address, state, city, country }] });
  if (!location) {
    res.status(400).send({ message: "Location not found" });
    return;
  }
  const report = new Report({
    disease,
    numberOfCases: cases,
    numberOfDeaths: deaths,
    approximatedPopulationCloseBy: population,
    description,
    user: user._id,
    location: location._id,
  });
  await report.save();
  res.status(201).send("report created");
});

module.exports = router;
