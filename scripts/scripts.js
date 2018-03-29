// Scrape Request
app.get('/scrape', function (req, res) {

})
request('https://www.nytimes.com/', function (error, response, html) {
    var $ = cheerio.load(html);
    var results = [];
    $('h1.AssetHeadline-headline').each(function (i, element) {
        var title = $(element).text();
        var link = $(element).parent().attr('href');
        if (title && link) {
          // Insert the data in the scrapedData db
          db.scrapedData.insert({
            title: title,
            link: link
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            }
            else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
          });
        };
    });
    console.log(results);
});