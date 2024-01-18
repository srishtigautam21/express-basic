const express = require("express");

const app = express(); //Creating HTTP server

const users = [
  {
    name: "john",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.use(express.json());

const kidneys = users[0].kidneys;
const noOfKidneys = kidneys.length;
let numberOfHealthyKidneys = kidneys.filter(
  (kidney) => kidney.healthy === true
).length;
const noOfUnhealthyKidneys = noOfKidneys - numberOfHealthyKidneys;

app.get("/", function (req, res) {
  // const kidneys = users[0].kidneys;
  // const noOfKidneys = kidneys.length;
  // let numberOfHealthyKidneys = kidneys.filter(
  //   (kidney) => kidney.healthy === true
  // ).length;
  // const noOfUnhealthyKidneys = noOfKidneys - numberOfHealthyKidneys;
  res.json({
    kidneys,
    noOfKidneys,
    numberOfHealthyKidneys,
    noOfUnhealthyKidneys,
  });
});

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({ msg: "Done" });
});

app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({});
});

app.delete("/", function (req, res) {
  if (noOfUnhealthyKidneys >= 1) {
    let newKidneys = users[0].kidneys.filter(
      (kidney) => kidney.healthy === true
    );
    users[0].kidneys = newKidneys;
    res.json({});
  } else {
    res.json({ msg: "You have no unhealthy kidney" });
  }
});
app.listen(3000);

//run node index.js to run server
