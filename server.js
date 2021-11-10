const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });





app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});


db.Workout.create({ name: "Workout Tracker" })
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({message}) => {
    console.log(message);
  });

app.post("/api/workouts", ({body}, res) => {
  db.Exercise.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/api/workouts/range", (req, res) => {
 
   (error, data) => {
      if (error) {
          res.send(error);
      } else {
          res.json(data);
      }
    }
  });

  app.put("/api/workouts/:id", (req, res) => {
    let ObjectId=mongoose.Types.ObjectId(req.params.id);
    db.Workout.findByIdAndUpdate(
      {ObjectId},
        {
            $push: {
                exercises: [req.body]
            }
            
        }, {
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

app.get("/find/:id", (req, res) => {
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
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});