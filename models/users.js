const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;
