// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Reservation and waitlist (DATA)
// =============================================================
var reservations = [{
  customerName: "John Doe",
  phoneNumber: "512-555-1234",
  customerEmail: "JohnDoe@gmail.com",
  customerID: "1234"
}];

var waitList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Show JSON
app.get("/api/tables", function(req, res) {

  res.json(reservations);

});

app.get("/api/waitlist", function(req, res) {

  res.json(waitList);

});

// Create New Reservation - takes in JSON input
app.post("/api/new", function(req, res) {
  var newReservation = req.body;

  reservations.push(newReservation);

  res.json(newReservation);
});

// Add to waitlist
app.post("/api/waitlist", function(req, res) {
  var newWaitlist = req.body;

  waitList.push(newWaitlist);

  res.json(newWaitlist);
});

app.post("/api/clear", function(req, res) {
  reservations = [];
  waitList = [];
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});