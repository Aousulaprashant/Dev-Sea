const express = require("express");
const router = express.Router();
const Answer = require("../models/Answers.models");
const QuationModel = require("../models/Quations.model");

// ✅ Create an answer
router.post("/", async (req, res) => {
  try {
    const { answer, quationId, posted_by } = req.body;
    console.log(req.body);
    const newAnswer = new Answer({ answer, quation: quationId, posted_by });
    const savedAnswer = await newAnswer.save();
    const Quation = await QuationModel.findById(quationId);
    if (Quation) {
      Quation.answers.push(savedAnswer._id.toString());
      await Quation.save();
    }

    res.status(201).json({ message: "Answer created", data: savedAnswer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Read a single answer
router.get("/:id", async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id)
      .populate("quation")
      .populate("posted_by");

    if (!answer) return res.status(404).json({ message: "Answer not found" });

    res.json({ message: "Answer found", data: answer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update an answer
router.put("/:id", async (req, res) => {
  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(
      req.params.id,
      { answer: req.body.answer },
      { new: true }
    );

    if (!updatedAnswer)
      return res.status(404).json({ message: "Answer not found" });

    res.json({ message: "Answer updated", data: updatedAnswer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete an answer
router.delete("/:id", async (req, res) => {
  try {
    const deletedAnswer = await Answer.findByIdAndDelete(req.params.id);

    if (!deletedAnswer)
      return res.status(404).json({ message: "Answer not found" });

    res.json({ message: "Answer deleted", data: deletedAnswer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
