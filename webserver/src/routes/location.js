const { Router } = require("express");
const router = Router();
const Location = require("../database/schemas/Location");
const User = require("../database/schemas/User");

//get registered locations
router.get("/", async (req, res) => {
  const locations = await Location.find();
  if (locations) {
    res.status(200).send(locations);
  } else {
    res.status(200).send([]);
  }
});

//get location by address
router.get("/address/:address", async (req, res) => {
  const { address } = req.params;
  const location = await Location.findOne({ address });
  if (!location) {
    res.status(404).send({ message: "Location not found" });
    return;
  }
  res.status(200).send(location);
});

//get location by city
router.get("/city/:city", async (req, res) => {
  const { city } = req.params;
  const location = await Location.find({ city });
  if (!location) {
    res.status(404).send({ message: "Location not found" });
    return;
  }
  res.status(200).send(location);
});

//get location by country
router.get("/country/:country", async (req, res) => {
  const { country } = req.params;
  const location = await Location.find({ country });
  if (!location) {
    res.status(404).send({ message: "Location not found" });
    return;
  }
  res.status(200).send(location);
});

//get location by state
router.get("/state/:state", async (req, res) => {
  const { state } = req.params;
  const location = await Location.find({ state });
  if (!location) {
    res.status(404).send({ message: "Location not found" });
    return;
  }
  res.status(200).send(location);
});

//register location
router.post("/:userName", async (req, res) => {
  const { userName } = req.params;
  const { id, address, city, country, state } = req.body;
  const user = await User.find({ userName });
  if (!user) {
    res.status(403).send("Unauthorized");
  } else {
    const location = new Location({
      id,
      address,
      city,
      country,
      state,
    });
    await location.save();
    res.status(201).send("location registered");
  }
});

module.exports = router;

