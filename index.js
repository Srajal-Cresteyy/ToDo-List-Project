const express = require("express");
const bodyParser = require("body-parser");
const http = require("https");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let tasks = [];
let workItems = [];

app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", {
    listTitle: day,
    newLists: tasks,
  });
});

app.post("/", function (req, res) {
  let task = req.body.task;

  if (req.body.list === "Work") {
    workItems.push(task);
    res.redirect("/work");
  } else {
    tasks.push(task);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work",
    newLists: workItems,
  });
});

app.post("/work", function (req, res) {
  let task = req.body.task;
  workItems.push(task);
  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("Server up! and running on port 3000 ");
});
