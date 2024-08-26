const { Router } = require("express");
const router = Router();
const User = require("../database/schemas/User");
const Profile = require("../database/schemas/Profile");
const Picture = require("../database/schemas/Picture");

router.get("/picture", async (req, res) => {
  const pictures = await Picture.find();
  res.status(200).send(pictures);
  return;
});
router.get("/participants/:userName", async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ userName });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const profiles = await Profile.find().populate('user', 'number');
  if (!profiles || profiles.length === 0) {
    return res.status(404).send({ message: "No profiles found" });
  }

  const serializedProfiles = await Promise.all(profiles.map(async (profile, index) => {
    const userDetails = await User.findById(profile.user);
    return {
      id: index + 1,
      avatarUrl: profile.avatarUrl,
      name: profile.name,
      role: profile.role,
      bio: profile.bio,
      additionalDetails: profile.additionalDetails,
      number: userDetails ? userDetails.number : "",
      email: userDetails ? userDetails.email : "",
    };
  }));
  res.status(200).send(serializedProfiles);
});

router.get("/:userName", async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ userName });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  const profile = await Profile.findOne({ user: user._id });
  if (!profile) {
    res.status(404).send({ message: "Profile not found" });
    return;
  }
  res.status(200).send({
    avatarUrl: profile.avatarUrl,
    name: profile.name,
    role: profile.role,
    bio: profile.bio,
    additionalDetails: profile.additionalDetails,
  });
  return;
});

router.get("/settings/:userName", async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ userName });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  const profile = await Profile.findOne({ user: user._id });
  if (!profile) {
    res.status(404).send({ message: "Profile not found" });
    return;
  }
  res.status(200).send({
    avatarUrl: profile.avatarUrl,
    name: profile.name,
    email: user.email,
    number: user.number,
    role: profile.role,
    bio: profile.bio,
    additionalDetails: profile.additionalDetails,
  });
  return;
});

router.post("/settings/:userName", async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ userName });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  const profile = await Profile.findOne({ user: user._id });
  if (!profile) {
    res.status(404).send({ message: "Profile not found" });
    return;
  }
  const { avatarUrl, name, email, number, role, bio, additionalDetails } =
    req.body;
  if (
    !avatarUrl ||
    !name ||
    !email ||
    !number ||
    !role ||
    !bio ||
    !additionalDetails
  ) {
    res.status(500).send({ message: "missing values" });
    return;
  }
  profile.avatarUrl = avatarUrl;
  profile.name = name;
  profile.bio = bio;
  profile.role = role;
  profile.additionalDetails = additionalDetails;
  user.email = email;
  user.number = number;
  await profile.save();
  await user.save();
  res.status(200).send({ message: "successful edit" });
  return;
});

module.exports = router;
