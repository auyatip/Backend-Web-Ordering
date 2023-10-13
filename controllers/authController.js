const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//authentication , log-in , Admin or Not

//register
exports.registerController = async (req, res) => {
  try {
    const isExisting = await userModel.findOne({ email: req.body.email });
    if (isExisting) {
      throw new Error(
        "Already such an account with this email. Try a new one!"
      );
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    const { password, ...others } = newUser._doc;
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    return res.status(201).json({ others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //VALIDATION
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const User = await userModel.findOne({ email });
    if (!User) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }

    //PASSWORD
    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invlid username or password",
      });
    }

    const token = jwt.sign(
      { id: User._id, isAdmin: User.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );
    // ถ้ารหัสตรงกัน
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      User,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};
