const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});

//urlSchema.plugin(AutoIncrement, {inc_field: 'short_url'});

const Exercise = mongoose.model("Exercise", exerciseSchema);

exports.exerciseSchema = exerciseSchema;
exports.exerciseModel = Exercise;