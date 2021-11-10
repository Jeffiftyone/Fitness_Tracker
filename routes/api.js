const router = require("express").Router();
const Workout = require("../models/Workout.js");
const { route } = require("./htmlRoutes.js");

// db.Workout.create({ name: "Workout Tracker" })
//   .then(dbWorkout => {
//     console.log(dbWorkout);
//   })
//   .catch(({message}) => {
//     console.log(message);
//   });

router.post("/api/workouts", ({body}, res) => {
  db.Exercise.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
 
   (error, data) => {
      if (error) {
          res.send(error);
      } else {
          res.json(data);
      }
    }
  });

  router.put("/api/workouts/:id", (req, res) => {
    let ObjectId=mongoose.Types.ObjectId(req.params.id);
    db.Workout.findByIdAndUpdate(
      {ObjectId},
        {$push: {exercises: [req.body]}
        },
        {
            upsert: true
        },
        (error, data) => {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log(data)
                res.send(data);
            }
        }
    );
});

router.get("/find/:id", (req, res) => {
  db.Workout.findOne(
      {
          _id: mongoose.Types.ObjectId(req.params.id)
      },
      (error, data) => {
          if (error) {
              res.send(error);
          } else {
              res.send(data);
          }
      }
  );
});
module.exports = router;