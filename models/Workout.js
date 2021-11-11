const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  exercises: [
    {
      type: {
        type: String,
        required: 'Enter type of exercise to perform',
      },
      name: {
        type: String,
        required: 'Enter exercise name to perform',
      },
      duration: {
        type: Number,
        required: 'Enter duration in minutes',
      },
      distance: {
        type: Number
      },
      weight: {
        type: Number
      },
      sets: {
        type: Number
      },
      reps: {
        type: Number
      },
    },
  ],
  day: {
    type: Date,
    default: Date.now,
  },
});



const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;