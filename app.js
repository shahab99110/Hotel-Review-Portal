const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/give-review", function (req, res) {
  res.render("give-review");
});
app.post("/hotel-review-data-form", function (req, res) {
  const userFormSubmittedData = req.body;
  const userDataFilePath = path.join(__dirname, "data", "user.json");
  const readableUserData = fs.readFileSync(userDataFilePath);
  const existingUserData = JSON.parse(readableUserData);
  existingUserData.push(userFormSubmittedData);
  fs.writeFileSync(userDataFilePath, JSON.stringify(existingUserData));
  res.redirect("/");
});

app.get("/hotel-list", function (req, res) {
    const userFormSubmittedData = req.body;
  const userDataFilePath = path.join(__dirname, "data", "user.json");
  const readableUserData = fs.readFileSync(userDataFilePath);
  const existingUserData = JSON.parse(readableUserData);
  res.render("hotel-list", { numberOfHotel: existingUserData.length, HotelList: existingUserData });
});

app.listen(3000);
