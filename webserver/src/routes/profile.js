const { Router } = require("express");
const router = Router();
const User = require("../database/schemas/User");
const Profile = require("../database/schemas/Profile");
const Picture = require("../database/schemas/Picture");

router.get("/", async (req, res) => {
  const userName = req.session.user.userName;
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

router.post("/", async (req, res) => {
  const userName = req.session.user.userName;
  const user = await User.findOne({ userName });
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  const profile = await Profile.findOne({ user: user._id });
  if (!profile) {
    res.status(404).send({ message: "Profile not found" });
    const { avatarUrl, name, role, bio, additionalDetails } = req.body;
    const newProfile = new Profile({
      avatarUrl,
      name,
      role,
      bio,
      additionalDetails,
      user: user._id,
    });
    await newProfile.save();
    res.status(201).send("profile created!");
    return;
  }
  const { avatarUrl, name, role, bio, additionalDetails } = req.body;
  if (avatarUrl) {
    profile.avatarUrl = avatarUrl;
  }
  if (name) {
    profile.name = name;
  }
  if (role) {
    profile.role = role;
  }
  if (bio) {
    profile.bio = bio;
  }
  if (additionalDetails) {
    profile.additionalDetails = additionalDetails;
  }
  await profile.save();
  res.status(200).send("profile updated!");
});

router.get("/picture", async (req, res) => {
  const pictures = await Picture.find();
  res.status(200).send(pictures);
});

module.exports = router;
