// Import Files
const db = require('../models');
const scrape = require('../scripts/scrape');

module.exports = function (app) {s

  // Home page route
  // app.get('/', function (req, res) {
  //   res.sendFile(path.join(__dirname + 'public/index.html'));
  // });

  app.get("/scrape", function (req, res) {
    scrape(req, res);
    res.json("Scrape successful.");
  });

  // Populate page with Headlines
  app.get("/headlines", function (req, res) {
    db.Headline.find({})
      .then((dbHeadline) => res.json(dbHeadline))
      .catch((err) => res.json(err));
  });
};