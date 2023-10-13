const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is require"],
    },
    price: {
      type: Number,
      required: [true, "image is require"],
    },
    img: {
      type: String,
      required: [true, "image is require"],
    },
    review: {
      type: Number,
      required: [true, "image is require"],
    },
    category: {
      type: String,
      required: [true, "image is require"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
