const { Router } = require("express");
const router = Router();
const Report = require("../database/schemas/Report");
const User = require("../database/schemas/User");
const Location = require("../database/schemas/Location");

router.get("/", async (req, res) => {
  const reports = await Report.find().lean().populate('location').sort({ createdAt: -1 });
  if (reports && reports.length > 0) {
    const serializedReports = await Promise.all(reports.map(async report => {
      const previousReport = await Report.findOne({
        disease: report.disease,
        location: report.location._id,
        createdAt: { $lt: report.createdAt }
      }).sort({ createdAt: -1 });

      let trend = "N/A";
      let trendColor = "gray";
      let location = await Location.findOne

      if (previousReport) {
        const caseDifference = report.numberOfCases - previousReport.numberOfCases;
        if (caseDifference > 0) {
          trend = "Increasing";
          trendColor = "red";
        } else if (caseDifference < 0) {
          trend = "Decreasing";
          trendColor = "green";
        } else {
          trend = "Stable";
          trendColor = "blue";
        }
      }
      return {
        disease: report.disease,
        trend,
        trendColor,
        mortalityRate: ((report.numberOfDeaths / report.numberOfCases) * 100).toFixed(1) + "%",
        cases: report.numberOfCases.toLocaleString(),
        location: report.location.name
      };
    }));
    res.status(200).json(serializedReports);
  } else {
    res.status(200).json([]);
  }
});

router.post("/:userName", async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ userName });
  if (!user) {
    res.status(400).send({ message: "User not found" });
    return;
  }
  const { disease, numberOfCases, numberOfDeaths, approximatedPopulationCloseBy, description, address } = req.body;
  const location = await Location.findOne({ address: address.split(", ")[0] });
  if (!location) {
    res.status(400).send({ message: "Location not found" });
    return;
  }
  const report = new Report({
    disease,
    numberOfCases,
    numberOfDeaths,
    approximatedPopulationCloseBy,
    description,
    user: user._id,
    location: location._id,
  });
  await report.save();
  res.status(201).send("report created");
});

module.exports = router;
