const { Router } = require("express");
const router = Router();
const User = require("../database/schemas/User");
const Profile = require("../database/schemas/Profile");
const { hashPassword, comparePassword } = require("../utils/helper");
const SECRET_KEY = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { userName, email, number, password, confirmPassword } = req.body;
  if (userName && email && number && password && confirmPassword) {
    const user = await User.findOne({ $or: [{ userName }, { email }] });
    if (user) {
      res.status(400).send("User already exists");
    } else {
      if (password === confirmPassword) {
        const newUser = new User({
          userName,
          email,
          number,
          password: hashPassword(password),
        });
        try {
          await newUser.save();
          const newProfile = new Profile({
            avatarUrl: "static/avatar.jpeg",
            name: "john doe",
            bio: "This is my bio",
            role: "Default role",
            additionalDetails: "I am additted to coffee btw...",
            user: newUser.id,
          });
          await newProfile.save();
          // Removed session logic
          const tokenUser = { id: newUser.id, username: newUser.userName };
          const token = jwt.sign(tokenUser, SECRET_KEY, { expiresIn: "1h" });
          res.status(201).send({ user: tokenUser, token });
        } catch (error) {
          res.status(500).send({ message: error.message });
        }
      } else {
        res.status(400).send("Bad Request");
      }
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Removed session check
  if (email && password) {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({ message: "User not found" });
    } else {
      if (comparePassword(password, user.password)) {
        // Removed session logic
        const tokenUser = { id: user.id, username: user.userName };
        const token = jwt.sign(tokenUser, SECRET_KEY, { expiresIn: "1h" });
        res.status(200).send({ user: tokenUser, token });
      } else {
        res.status(400).send({ message: "Invalid password" });
      }
    }
  } else {
    res.status(400).send({ message: "Bad Request" });
  }
});

router.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;
  const user = await User.findone({ email });
  if (!user) {
    res.status(400).send({ error: "User not found" });
  } else {
    res.status(200).send({ message: "Reset link sent to email" });
  }
});

router.post("/changePassword", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).send({ message: "User not found" });
  } else {
    const newPassword = hashPassword(password);
    user.password = newPassword;
    await user.save();
    res.status(200).send({ message: "Password changed" });
  }
});

router.post("/logout", (req, res) => {
  // Removed session destruction logic
  res.status(200).send({ message: "Logged out" });
});

module.exports = router;
