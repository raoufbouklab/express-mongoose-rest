const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  let roles = req.body.roles;

  if (!(firstName && lastName && email && password && confirmPassword)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password != confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const duplicate = await User.findOne({ email: email }).exec();

  if (duplicate)
    return res.status(409).json({ message: "User exists with this email" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if(!roles) roles = ["User"]

    const newUser = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      roles
    });

    res.status(201).json({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      id: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(400).json({ message: "Email and password are required" });

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) return res.status(401);

  const isPasswordsMatch = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordsMatch) {
    return res.sendStatus(401);
  } else {
    const accessToken = jwt.sign({ id: foundUser._id }, process.env.TOKEN_KEY, {
      expiresIn: "10m",
    });

    const { password, ...otherData } = foundUser;
    console.log(otherData);
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      })
      .status(200)
      .json({
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        id: foundUser._id,
      });
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

module.exports = { register, login, logout };
