const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password").lean();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID is required" });

  const user = await User.findOne({ _id: req.params.id })
    .exec()
    .select("-password")
    .lean();
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json(`User ID ${req.params.id} not found`);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
};
