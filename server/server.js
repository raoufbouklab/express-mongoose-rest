const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const dotenv = require("dotenv").config();
const colors = require("colors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const connectDB = require("./config/db");
const verifyJWT = require("./middleware/verifyJWT");
const port = process.env.PORT || 5000;

console.log(process.env.NODE_ENV)
connectDB();

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", authRouter);

app.use(verifyJWT);
app.use("/library/v1/users", userRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Server started on port ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
