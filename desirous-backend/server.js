const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/videoshare", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const Video = mongoose.model("Video", {
  title: String,
  description: String,
  videoPath: String,
  thumbnailPath: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", {
  videoId: mongoose.Schema.Types.ObjectId,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 100MB limit
});

// Routes
// Get all videos
app.get("/api/videos", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single video
app.get("/api/videos/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload video
app.post(
  "/api/videos",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const video = new Video({
        title: req.body.title,
        description: req.body.description,
        videoPath: req.files.video[0].path,
        thumbnailPath: req.files.thumbnail[0].path,
      });
      await video.save();
      res.status(201).json(video);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Get video comments
app.get("/api/videos/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add comment to video
app.post("/api/videos/:id/comments", async (req, res) => {
  try {
    const comment = new Comment({
      videoId: req.params.id,
      content: req.body.content,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
