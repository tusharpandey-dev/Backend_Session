const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadFile } = require("../controllers/upload.controller");

// POST /upload
router.post("/upload", upload.single("image"), uploadFile);

module.exports = router;
