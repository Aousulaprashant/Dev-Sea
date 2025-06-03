const mongoose = require("mongoose");

const AnswersSchema = mongoose.Schema({
  answer: {
    type: String,
  },

  quation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quation",
  },
  posted_by: {
    type: String,
  },
});

const answers_model = mongoose.model("answer", AnswersSchema);

module.exports = answers_model;
