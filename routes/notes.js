const { Note } = require("../models/note");
const express = require("express");
const router = express.Router();

// Get All Notes
router.get(`/`, async (req, res) => {
  const noteList = await Note.find();

  if (!noteList) {
    res.status(500).json({ success: false });
  }
  res.send(noteList);
});

// Get Specific Note
router.get("/:id", async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404).json({ message: "The note was not found" });
  }
  res.send(note);
});

// Add a New Note
router.post("/", async (req, res) => {
  let note = new Note({
    title: req.body.title,
    description: req.body.description,
  });
  note = await note.save();

  if (!note) {
    return res.status(404).send("This Note couldn't be saved. Please Try Again Later.");
  }
  res.send(note);
});

// Update an Existing Note
router.put("/:id", async (req, res) => {
  let note = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
    },
    { new: true }
  );

  if (!note) {
    return res.status(500).send("This Note Couldn't be Updated.");
  }
  res.send(note);
});

// Delete a Specific Note
router.delete("/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then((note) => {
      if (note) {
        return res
          .status(200)
          .json({ success: true, message: "the note is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "note not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
