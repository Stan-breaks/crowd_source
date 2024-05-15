const { Router } = require("express");
const router = Router();
const Report = require("../database/schemas/Report");
const User = require("../database/schemas/User");
const Location = require("../database/schemas/Location");

router.get("/", async (req, res) => {
  const userName = req.session.user.userName;
  const reports = await Report.find();
  if (reports) {
    res.status(200).send(reports);
  } else {
    res.status(200).send([]);
  }
});

router.get("/address/:address", async (req, res) => {
  const { address } = req.params;
  const location = await Location.findOne({ address });
  if (!location) {
    res.status(404).send({ message: "Location not found" });
    return;
  }
  const reports = await Report.findall({ location: location._id });
  if (reports) {
    res.status(200).send(reports);
  }
  res.status(200).send([]);
});

router.get("/city/:city", async (req, res) => {
  const { city } = req.params;
  const location = await Location.find({ city });
  if (!location) {
    res.status(404).send({ message: "Location not found" });
    return;
  }
  const reports = await Report.findall({ location: location._id });
  if (reports) {
    res.status(200).send(reports);
  }
  res.status(200).send([]);
});

router.get("/country/:country", async (req, res) => {
  const { country } = req.params;
  const location = await Location.find({ county });
  if (!location) {
    res.status(404).send({ message: "Location not found" });
    return;
  }
  const reports = await Report.findall({ location: location._id });
  if (reports) {
    res.status(200).send(reports);
  }
  res.status(200).send([]);
});

router.get("/state/:state", async (req, res) => {
  const { state } = req.params;
  const location = await Location.find({ state });
  if (!location) {
    res.status(404).send({ message: "Location not found" });
    return;
  }
  const reports = await Report.findall({ location: location._id });
  if (reports) {
    res.status(200).send(reports);
  }
  res.status(200).send([]);
});

router.post("/", async (req, res) => {
  const { description, address } = req.body;
  const userName = req.session.user.userName;
  const user = await User.findOne({ userName });
  const location = await Location.findOne({ address });
  if (!location) {
    res.status(400).send({ message: "Location not found" });
    return;
  }
  const report = new Report({
    description,
    user: user._id,
    location: location._id,
  });
  await report.save();
  res.status(201).send("report created");
});

module.exports = router;
