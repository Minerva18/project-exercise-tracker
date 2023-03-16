const mongoose = require("mongoose");

const exerciseSchema = require("../models/exercise.js").exerciseSchema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  log: [exerciseSchema]
});

//urlSchema.plugin(AutoIncrement, {inc_field: 'short_url'});

const User = mongoose.model("User", userSchema);

module.exports = User;