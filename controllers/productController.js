const Product = require("../models/Product");

//GET ALL
exports.getProductController = async (req, res) => {
  try {
    const products = await Product.find(req.query);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

//GET ONE BY ID
exports.getOneProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(500).json({ msg: "no Product with id" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

//CREATE Product
exports.addProductController = async (req, res) => {
  try {
    //req.body = all data input
    const newProduct = await Product.create({ ...req.body });
    return res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
  }
};
