const uploadController = require("express").Router();

const { verifyToken, verifyTokenAdmin } = require("../middleware/verifyToken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({
  storage,
  //save as storage : sorage
});

// req.body.image
uploadController.post(
  "/image",
  verifyToken,
  upload.single("image"),
  (req, res) => {
    try {
      return res.status(201).json({ msg: "Successfully uploaded file" });
    } catch (error) {
      console.error(error.message);
    }
  }
);

module.exports = uploadController;
