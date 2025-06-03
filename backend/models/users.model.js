const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return this.authProvider === "local";
    },
  },
  tags: [
    {
      type: String,
    },
  ],
  firebaseUID: {
    type: String,
  },
  authProvider: {
    type: String,
    enum: ["local", "firebase"],
    default: "local",
  },
  SavedQuestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quation",
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
