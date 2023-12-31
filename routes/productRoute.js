const express = require("express");
const {
  getProductController,
  getOneProductController,
  addProductController,
  updateProductController,
} = require("../controllers/productController");
const { verifyToken, verifyTokenAdmin } = require("../middleware/verifyToken");

//router Object
const router = express.Router();

// // GET ALL
router.get("/", getProductController);

// // GET ONE
router.get("/find/:id", verifyToken, getOneProductController);

// // CREATE Product || POST
router.post("/add", verifyTokenAdmin, addProductController);

// // UPDATE PRODUCT || POST
router.put("/update/:id", verifyTokenAdmin, updateProductController);

module.exports = router;
