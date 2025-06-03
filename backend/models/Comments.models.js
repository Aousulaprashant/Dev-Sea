const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  Comment: {
    type: String,
  },
  quation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quation",
  },
  posted_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const comments_model = mongoose.model("comment", CommentSchema);

module.exports = comments_model;
