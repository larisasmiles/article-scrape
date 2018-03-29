
const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const request = require('request');
const logger = require('morgan');


// Require all models and routes
// var db = require("./models");
// var routes = require('./routes')(app);

// Local port
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.use(logger("dev"));

//Require handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Mongojs configuration
var databaseUrl = "mongoHeadlines";
var collections = ["articles"];

//Setup for deploying to heroku with mongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  // mongodb://<dbuser>:<dbpassword>@ds127899.mlab.com:27899/heroku_86sb9sv8

    //   useMongoClient: true
});

// Retrieve data from the db
app.get("/all", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.scrapedData.find({}, function(error, found) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.json(found);
      }
    });
  });
  

// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port " + PORT);
});
