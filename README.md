# Timestamp Microservice

The boilerplate code for this project which my solution is built on top of can be found here:
https://github.com/freeCodeCamp/boilerplate-project-timestamp/

Built using Node.js and Express I implemented a RESTful API endpoint that optionally accepts either a date string or Unix timestamp as a URL parameter, and returns timestamp data in both Unix and UTC formats. My solution first checks if the date parameter is missing. If so, it returns an object with the current time. It then attempts to construct a valid JavaScript Date object from the date parameter passed to the endpoint. If the input is invalid, the API responds with the required { "error": "Invalid Date" } format. This approach keeps the logic simple, predictable, and fully aligned with the project requirements, while ensuring the service reliably handles edge cases and produces consistent JSON output.

## Test cases
1. ✅ A request to `/api/:date?` with a valid date should return a JSON object with a `unix` key that is a Unix timestamp of the input date in milliseconds (as type Number)
2. ✅ A request to `/api/:date?` with a valid date should return a JSON object with a `utc` key that is a string of the input date in the format: `Thu, 01 Jan 1970 00:00:00 GMT`
3. ✅ A request to `/api/1451001600000` should return `{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }`
4. ✅ Your project can handle dates that can be successfully parsed by `new Date(date_string)`
5. ✅ If the input date string is invalid, the API returns an object having the structure `{ error : "Invalid Date" }`
6. ✅ An empty date parameter should return the current time in a JSON object with a `unix` key
7. ✅ An empty date parameter should return the current time in a JSON object with a `utc` key

## Usage
### Endpoints
```
GET /api/:date?
```
### Examples
```
GET /api/2015-12-25
→ { "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }

GET /api/1451001600000
→ { "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }

GET /api/invalid-date
→ { "error": "Invalid Date" }

GET /api
→ { "unix": <current timestamp>, "utc": "<current UTC date>" }
```
