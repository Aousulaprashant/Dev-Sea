const jwt = require("jsonwebtoken");
const express = require("express");
const routes = express.Router();

const validate = async (req, res, next) => {
  const token = req.headers.authorization?.split("")[1];
  if (!token) {
    return res.status(401).json({ message: "AccesDenied" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token!" });
    }
    req.user = user;
    return res.status(200).json({ message: "sucessfull login!" });
    next();
  });
};

module.exports = validate;
