// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", (req, res) => {
  const timestamp = {unix: null, utc: null};
  // returns a JSON object of {"unix": "<unix_timestamp>", "utc": "<utc_timestamp>"}
  // or {error: "Invalid Date"}
  if (!req.params.date) {
    timestamp.unix = Date.now();
    timestamp.utc = Date();
    res.json(timestamp);

} else if (/-/g.test(req.params.date)) {
    timestamp.unix = new Date(req.params.date).getTime();
    timestamp.utc = new Date(req.params.date).toUTCString();
    res.json(timestamp);

} else {
    timestamp.unix = Number(req.params.date);
    timestamp.utc = new Date(timestamp.unix).toUTCString();
    res.json(timestamp);
}
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
