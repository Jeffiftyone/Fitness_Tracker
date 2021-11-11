const router = require("express").Router();
const Workout = require("../models/Workout.js");

//post
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//get
router.get("/api/workouts", (req, res)=>{
  Workout.aggregate([ {
    $addFields: {
    totalDuration:{
      $sum: '$exercises.duration'
    }
   }
  }
]).then((workout)=>{
    console.log('get api', workout)
    res.json(workout);
  }).catch((e) => {
    res.json(e)
  })
});

//put
router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
      {
        $push: {exercises: req.body}
      },{
        new: true, runValidators: true
        })
        .then((workout)=>{
          res.json(workout)
        })
        .catch((err)=>{
          res.json(err)
        })
  });


router.get(`/api/workouts/range`, (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration:
                  { $sum: '$exercises.duration' },
              totalWeight:
                  { $sum: '$exercises.weight' }
          }
      }
  ]).then((workout) => {
          console.log('', workout);
          res.json(workout)
      }).catch((e) => {
          res.json(e)
      })
});

module.exports = router;