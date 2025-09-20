// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
	const timestamp = { unix: null, utc: null };

	if (!req.params.date) {
		timestamp.unix = Date.now();
		timestamp.utc = Date();

	} else if (/^\d+$/g.test(req.params.date)) {
		if (isNaN(new Date(+req.params.date))) {
			res.json({ error: "Invalid Date" });
			return;
		}
		timestamp.unix = parseInt(req.params.date);
		timestamp.utc = new Date(timestamp.unix).toUTCString();
		
	} else {
		if (isNaN(new Date(req.params.date))) {
			res.json({ error: "Invalid Date" });
			return;
		}
		timestamp.unix = new Date(req.params.date).getTime();
		timestamp.utc = new Date(req.params.date).toUTCString();
	}
	res.json(timestamp);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log("Your app is listening on port " + listener.address().port);
});
