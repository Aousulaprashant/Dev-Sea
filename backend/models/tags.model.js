const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  question: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quation",
    },
  ],
});

module.exports = mongoose.model("Tag", tagSchema);
