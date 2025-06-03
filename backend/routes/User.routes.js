const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const UserDb = require("../models/users.model");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const routes = express.Router();

dotenv.config();

routes.post("/register", async (req, res) => {
  const { name, email, password, tags } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await UserDb.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await UserDb.create({
      name,
      email,
      password: hashPassword,
      tags,
    });
    return res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }
});

routes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const user = await UserDb.findOne({ email });

    if (!user) {
      return res.status(405).json({ message: "user Does Not Exists" });
    }

    const hasedPassword = user.password;

    const isMatch = await bcrypt.compare(password, hasedPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const AccessToken = GetAccessToken(user);
    const RefreshToken = GetRefreshToken(user);

    res.cookie("refreshToken", RefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.setHeader("Authorization", `Bearer ${AccessToken}`);

    return res.status(200).json({
      user: user,
      message: "Successfully Login",
      accessToken: AccessToken,
    });
  } catch (e) {
    console.error(err);
    return res.status(500).json({ message: "Error login user." });
  }
});

routes.post("/profile", (req, res) => {
  //Your /profile route is typically used when the frontend needs to get the
  //currently logged-in user's information — after verifying that the user is authenticated.
  const AccessToken = req.headers.authorization;

  if (!AccessToken) {
    return res.status(401).json({ message: "Access Denied" });
  }

  jwt.verify(AccessToken, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    return res.status(200).json({ message: "Authorized", user });
  });
});

function GetAccessToken({ email, user }) {
  const AccessToken = jwt.sign({ email, user }, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });

  return AccessToken;
}

function GetRefreshToken({ email, user }) {
  const RefreshToken = jwt.sign({ email, user }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  return RefreshToken;
}

routes.post("/savedQuestion/:id", async (req, res) => {
  const { user_id } = req.body;
  const question_id = req.params.id;

  try {
    //console.log("entered");
    const user = await UserDb.findById(user_id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Prevent duplicate entries
    if (!user.SavedQuestions.includes(question_id)) {
      user.SavedQuestions.push(question_id);
      await user.save();
    }

    return res.status(201).json({ message: "Saved Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error registering user." });
  }
});

routes.get("/savedQuestions/:userId", async (req, res) => {
  try {
    const user = await UserDb.findById(req.params.userId).populate(
      "SavedQuestions"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ questions: user.SavedQuestions });
  } catch (err) {
    console.error("Error fetching saved questions:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = routes;
