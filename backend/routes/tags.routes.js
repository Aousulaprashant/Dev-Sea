const express = require("express");
const router = express.Router();
const Tag = require("../models/tags.model");
const User = require("../models/users.model");

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add tags to user interests
router.post("/add-tags", async (req, res) => {
  const { userId, selectedTags } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { tags: { $each: selectedTags } } },
      { new: true }
    );
    res.status(200).json(user.tags);
  } catch (err) {
    res.status(500).json({ message: "Unable to update tags" });
  }
});

// In routes/tag.routes.js
router.post("/add-new-tag", async (req, res) => {
  const { userId, tagName } = req.body;

  try {
    // 1. Create tag if not exist
    let tag = await Tag.findOne({ name: tagName });
    if (!tag) {
      tag = await Tag.create({ name: tagName });
    }

    // 2. Add to user's interests
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { tags: tag.name } },
      { new: true }
    );

    res.status(200).json({ success: true, tags: user.tags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding tag" });
  }
});

module.exports = router;
