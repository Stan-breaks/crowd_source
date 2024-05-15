const { Router } = require("express");
const router = Router();
const User = require("../database/schemas/User");
const { hashPassword, comparePassword } = require("../utils/helper");

router.post("/register", async (req, res) => {
  const { userName, email, number, password, confirmPassword } = req.body;
  if (userName && email && number && password && confirmPassword) {
    const user = await User.findOne({ $or: [{ userName }, { email }] });
    if (user) {
      res.status(400).send("User already exists");
    }
    if (password === confirmPassword) {
      const newUser = new User({
        userName,
        email,
        number,
        password: hashPassword(password),
      });

      try {
        await newUser.save();
        res.status(201).send({ message: "User created", code: 201 });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    } else {
      res.status(400).send("Bad Request");
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (req.session.user) {
    res.send("Aleardy logged in");
  } else {
    if (email && password) {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).send({ message: "User not found" });
      } else {
        if (comparePassword(password, user.password)) {
          req.session.user = {
            userName: user.userName,
          };
          res.status(200).send(req.session.user);
        } else {
          res.status(400).send({ message: "Invalid password" });
        }
      }
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
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
    await User.update();
    res.status(200).send({ message: "Password changed" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.status(200).send("Logged out");
  } else {
    res.status(400).send("Bad Request");
  }
});

module.exports = router;
