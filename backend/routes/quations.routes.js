const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");

const TagDb = require("../models/tags.model");
const dotenv = require("dotenv");
const routes = express.Router();

const UserDb = require("../models/users.model");
const QuationsDb = require("../models/Quations.model");

dotenv.config();

/**
router.get('/questions', getAllQuestions);
router.get('/questions/:id', getQuestionById);
router.post('/questions', createQuestion);
router.get('/questions/:id/answers', getAnswersForQuestion); 
*/

routes.get("/", async (req, res) => {
  try {
    const quations = await QuationsDb.find();
    if (!quations) {
      return res.status(201).json({ message: "No Quations Found" });
    }

    res.status(200).json({ quations, message: "SuccesFull" });
  } catch (e) {
    res.status(401).json({ message: e });
  }
});

routes.post("/questions", async (req, res) => {
  const { title, quation, tags, Useremail } = req.body;
  try {
    // const User = await UserDb.findOne({ email: Useremail }).select("_id");

    const newDb = await QuationsDb.create({
      title,
      quation,
      tags,
      posted_by: Useremail,
    });

    console.log(newDb);
    for (const tagName of tags) {
      await TagDb.findOneAndUpdate(
        { name: tagName },
        {
          $addToSet: { question: newDb._id },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    return res.status(200).json({ message: "successfull uploaded" });
  } catch (e) {
    res.status(401).json({ message: e });
  }
});

routes.get("/questions/:id", async (req, res) => {
  const quationId = req.params.id;
  try {
    const getQuestionById = await QuationsDb.findById(quationId).populate(
      "answers"
    );

    //console.log(getQuestionById._id);
    if (!getQuestionById) {
      return res.status(404).json({ message: "quation not found" });
    }

    return res
      .status(200)
      .json({ quation: getQuestionById, message: "Successfully Found" });
  } catch (e) {
    console.error("Error fetching question by ID:", e);
    res.status(500).json({ message: e.message || "Internal server error" });
  }
});

routes.delete("/questions/:id", async (req, res) => {
  const questionId = req.params.id;

  try {
    const deletedQuestion = await QuationsDb.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Optional: Clean up references in tags
    await TagDb.updateMany(
      { question: questionId },
      { $pull: { question: questionId } }
    );

    // Now remove tags with no associated questions
    await TagDb.deleteMany({ question: { $size: 0 } });

    res.status(200).json({
      message: "Question deleted successfully",
      deletedQuestion,
    });
  } catch (e) {
    console.error("Error deleting question:", e);
    res.status(500).json({ message: "Internal server error" });
  }
});

routes.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ error: "Query parameter q is required" });
    }

    // Simple text search on title and content (case-insensitive)
    const regex = new RegExp(searchTerm, "i");

    const questions = await QuationsDb.find({
      $or: [{ title: regex }, { content: regex }],
    }).limit(10); // limit results for performance

    res.json(questions);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
/*
routes.get("/questions/:id/answers", async (req, res) => {
  const quationId = req.params.id;
  try {
    const getQuestionById = await QuationsDb.findById(quationId);

    if (!getQuestionById) {
      return res.status(404).json({ message: "quation not found" });
    }

    const answersList = getQuestionById.answers;

    return res
      .status(200)
      .json({ quation: getQuestionById, message: "Successfully Found" });
  } catch (e) {
    res.status(401).json({ message: e });
  }
});
*/
routes.put("/questions/:id", async (req, res) => {
  const quationId = req.params.id;
  const { VoteType, Voteduser } = req.body.data;

  if (!["upvote", "downvote"].includes(VoteType)) {
    return res.status(400).json({ message: "Invalid vote type" });
  }

  try {
    const question = await QuationsDb.findById(quationId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const existingVote = question.votedUsers.find(
      (vote) => vote.userId === Voteduser
    );

    if (existingVote) {
      if (existingVote.voteType === VoteType) {
        return res.status(400).json({ message: `Already ${VoteType}d` });
      }

      // Change vote
      const voteChange = VoteType === "upvote" ? 2 : -2; // e.g. downvote to upvote: -1 → +1 = +2
      question.upvote += voteChange;

      // Update voteType in votedUsers
      existingVote.voteType = VoteType;
    } else {
      // First-time voter
      const voteChange = VoteType === "upvote" ? 1 : -1;
      question.upvote += voteChange;

      question.votedUsers.push({
        userId: Voteduser,
        voteType: VoteType,
      });
    }

    await question.save();

    res.status(200).json({
      message: "vote updated",
      upvotes: question.upvote,
      votedUsers: question.votedUsers,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = routes;
