const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add firsname"],
    },
    lastName: {
      type: String,
      required: [true, "Please add lastname"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    roles: [{
        type: String,
        default: "User"
    }],
    active: {
        type: Boolean,
        default: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
