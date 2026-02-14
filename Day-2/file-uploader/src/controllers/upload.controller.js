const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.uploadFile = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.file.path
    );

    // delete local file after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "file uploaded successfully",
      imageUrl: result.secure_url
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Upload failed"
    });
  }
};
