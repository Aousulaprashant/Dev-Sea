const express = require("express");
const routes = express.Router();
const admin = require("../fireBaseAuth/FireBaseConfig");
const User = require("../models/users.model");
const { GetAccessToken, GetRefreshToken } = require("./getTokens");

routes.post("/FireBase", async (req, res) => {
  const { idToken } = req.body;
  //console.log("firebaseToke :", idToken);
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, uid } = decodedToken;
    console.log("Decoded Firebase Token:", decodedToken);

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        firebaseUID: uid,
        authProvider: "firebase",
      });
    }
    const AccessToken = GetAccessToken(user);
    const RefreshToken = GetRefreshToken(user);
    res.cookie("refreshToken", RefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ user, AccessToken, RefreshToken });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
});

module.exports = routes;
