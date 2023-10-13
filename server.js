const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

//import ROUTES
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const uploadController = require("./controllers/uploadController");

dotenv.config();

//Connect DATABASE
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO, () => {
  console.log("DB is sccessfully connected.");
});

//MIDDLE WAREs
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//ROUTE

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
//Route ภายใน Controller เลย
app.use("/upload", uploadController);

//Start SERVER
app.listen(process.env.PORT, () => {
  console.log("Server has listening on 8000");
});
