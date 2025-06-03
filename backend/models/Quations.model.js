const mongoose = require("mongoose");

const QuationSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  quation: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answer",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  posted_by: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  upvote: { type: Number, default: 0 },
  votedUsers: [
    {
      userId: String,
      voteType: String,
    },
  ],
});

const quations_model = mongoose.model("quation", QuationSchema);

module.exports = quations_model;
