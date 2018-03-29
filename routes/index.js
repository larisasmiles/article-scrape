// Post a book to the mongoose database
app.post("/submit", function(req, res) {
  // Save the request body as an object called book
  var article = req.body;
  article.saved = false;

  // Save the book object as an entry into the books collection in mongo
  db.articles.save(article, function(error, saved) {
    // Show any errors
    if (error) {
      console.log(error);
    }
    else {
      // Otherwise, send the response to the client (for AJAX success function)
      res.send(saved);
    }
  });
});

// Find all articles marked as saved
app.get("/saved", function(req, res) {
// Go into the mongo collection, and find all docs where "saved" is true
db.articles.find({ saved: true }, function(error, saved) {
  // Show any errors
  if (error) {
    console.log(error);
  }
  else {
    // Otherwise, send the articles found to the browser as a json
    res.json(saved);
  }
});
});