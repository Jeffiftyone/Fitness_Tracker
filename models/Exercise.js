const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: String,
  title: String,
  duration: Number,
  weight: Number,
  reps: Number,
  sets: Number,
  distance: Number,

});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;