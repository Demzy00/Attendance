const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const {
  createUser,
  getAllUsers,
  editUser,
  deleteUserById,
} = require("../controllers/user.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit: 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)"));
    }
  },
});
router.post("/create", createUser);
router.get("/getAll", getAllUsers);
router.patch("/:id", editUser);
router.delete("/:id", deleteUserById);

module.exports = router;
